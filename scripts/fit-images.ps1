# Fits downloaded AI images to the exact slots the site expects.
#
#   1. Rename each download to its target name (see IMAGE-PROMPTS.md), e.g.
#      hero-port.jpg  -- any of .jpg/.jpeg/.png/.webp is accepted
#   2. Put them all in ./incoming
#   3. powershell -ExecutionPolicy Bypass -File scripts/fit-images.ps1
#
# Each file is centre-cropped to its slot's aspect ratio, downscaled to the
# slot's target size, and written to public/images/ as JPEG.
#
# Two deliberate behaviours:
#   * It never upscales. ChatGPT tops out at 1536px on the long edge; blowing
#     that up to a 2400px "target" invents no detail and triples the bytes. If
#     the source is smaller than the target, the output keeps the correct
#     ASPECT RATIO at the largest size the source actually supports.
#   * It writes JPEG, not PNG. These are photographs; the AI placeholders
#     currently in the repo are 12.7 MB of PNG for eight images.
#
# Originals in ./incoming are never modified.

param(
  [string]$In      = "incoming",
  [string]$Out     = "public/images",
  [int]   $Quality = 88
)

Add-Type -AssemblyName System.Drawing

# Slot manifest — target sizes are the IDEAL for real photography.
# Keep in step with IMAGES.md.
$slots = @(
  @{ name = 'hero-port';         w = 2400; h = 1600 }
  @{ name = 'story-farm';        w = 1200; h = 1500 }
  @{ name = 'desk-documents';    w = 1200; h = 900  }
  @{ name = 'containers-aerial'; w = 2400; h = 900  }
  @{ name = 'packing-mesh-bags'; w = 1200; h = 1500 }
  @{ name = 'product-coconut';   w = 1200; h = 900  }
  @{ name = 'product-textiles';  w = 1200; h = 900  }
  @{ name = 'product-leather';   w = 1200; h = 900  }
  @{ name = 'product-plastics';  w = 1200; h = 900  }
)

$root   = Split-Path -Parent $PSScriptRoot
$inDir  = Join-Path $root $In
$outDir = Join-Path $root $Out

if (-not (Test-Path $inDir)) {
  New-Item -ItemType Directory -Path $inDir -Force | Out-Null
  Write-Host "Created $inDir - put your renamed downloads there and re-run." -ForegroundColor Yellow
  exit 0
}
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
             Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)

$done = 0; $missing = @(); $totalKb = 0

foreach ($slot in $slots) {
  $src = Get-ChildItem -Path $inDir -File |
         Where-Object {
           [System.IO.Path]::GetFileNameWithoutExtension($_.Name) -ieq $slot.name -and
           $_.Extension -imatch '^\.(jpe?g|png|webp|bmp)$'
         } | Select-Object -First 1

  if (-not $src) { $missing += "$($slot.name).jpg"; continue }

  $img = [System.Drawing.Image]::FromFile($src.FullName)
  try {
    $targetRatio = $slot.w / $slot.h
    $srcRatio    = $img.Width / $img.Height

    # Largest centre crop of the source that matches the target ratio.
    if ($srcRatio -gt $targetRatio) {
      $cropH = $img.Height
      $cropW = [int][math]::Round($img.Height * $targetRatio)
    } else {
      $cropW = $img.Width
      $cropH = [int][math]::Round($img.Width / $targetRatio)
    }
    $cropX = [int](($img.Width  - $cropW) / 2)
    $cropY = [int](($img.Height - $cropH) / 2)

    # Never enlarge: cap the output at the cropped source size.
    $outW = [math]::Min($slot.w, $cropW)
    $outH = [int][math]::Round($outW / $targetRatio)
    $capped = $outW -lt $slot.w

    $bmp = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.PixelOffsetMode   = 'HighQuality'
    $g.SmoothingMode     = 'HighQuality'
    $g.Clear([System.Drawing.Color]::White)   # JPEG has no alpha
    $g.DrawImage(
      $img,
      (New-Object System.Drawing.Rectangle(0, 0, $outW, $outH)),
      $cropX, $cropY, $cropW, $cropH,
      [System.Drawing.GraphicsUnit]::Pixel
    )
    $g.Dispose()

    $dest = Join-Path $outDir "$($slot.name).jpg"
    $bmp.Save($dest, $jpegCodec, $encParams)
    $bmp.Dispose()

    $kb = [math]::Round((Get-Item $dest).Length / 1kb, 1)
    $totalKb += $kb
    $note = if ($capped) { "source too small for $($slot.w)x$($slot.h) - ratio kept" } else { "full target size" }
    "{0,-22} {1,4}x{2,-5} {3,7} KB   ({4})" -f "$($slot.name).jpg", $outW, $outH, $kb, $note
    $done++
  }
  finally { $img.Dispose() }
}

""
"Fitted $done of $($slots.Count) slots - {0} MB total." -f [math]::Round($totalKb/1024, 2)
if ($missing.Count -gt 0) {
  ""
  "Still to supply (drop into $In and re-run):"
  $missing | ForEach-Object { "  - $_" }
  ""
  "Any slot left empty keeps its branded placeholder on the site - nothing breaks."
}
