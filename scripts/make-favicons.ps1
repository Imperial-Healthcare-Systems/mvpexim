Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\ROSE MEHRA\Downloads\mvp-exim\public\logo\mvp-icon.png"
$outDir  = "C:\Users\ROSE MEHRA\Downloads\mvp-exim\public"
$scratch = "C:\Users\ROSEME~1\AppData\Local\Temp\claude\c--Users-ROSE-MEHRA-Documents-html-css-course\404a7bbe-19f7-4158-92fd-981c0a0f2033\scratchpad"

$src = [System.Drawing.Image]::FromFile($srcPath)

# Ink bounds measured on a 200x200 proxy, padded one proxy pixel and mapped back.
$k = $src.Width / 200.0
$cropX = [int][math]::Floor(25 * $k)
$cropY = [int][math]::Floor(18 * $k)
$cropW = [int][math]::Ceiling((180 - 25 + 1) * $k)
$cropH = [int][math]::Ceiling((170 - 18 + 1) * $k)
"crop: x=$cropX y=$cropY w=$cropW h=$cropH  (aspect $([math]::Round($cropW/$cropH,3)))"

<#
  Renders the mark centred in a square of $size, on white, then keys white to
  alpha. The art is dark ink on a pure-white field, so alpha = 255 - min(R,G,B)
  with an un-premultiply against white recovers the ink exactly. Keying AFTER
  the downsample (rather than before) avoids the dark fringing GDI+ produces
  when it interpolates non-premultiplied alpha.
  Returns @(colourBitmap, whiteBitmap).
#>
function New-Mark([int]$size, [double]$inner) {
  $stage = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($stage)
  $g.Clear([System.Drawing.Color]::White)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.PixelOffsetMode   = 'HighQuality'
  $g.SmoothingMode     = 'HighQuality'

  # Fit the ink into the inner box, preserving its aspect ratio.
  $box = $size * $inner
  $sc  = [math]::Min($box / $cropW, $box / $cropH)
  $dw  = $cropW * $sc
  $dh  = $cropH * $sc
  $dx  = ($size - $dw) / 2.0
  $dy  = ($size - $dh) / 2.0
  $dest = New-Object System.Drawing.RectangleF($dx, $dy, $dw, $dh)
  $g.DrawImage($src, $dest, (New-Object System.Drawing.RectangleF($cropX, $cropY, $cropW, $cropH)), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()

  $colour = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $white  = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  for ($y = 0; $y -lt $size; $y++) {
    for ($x = 0; $x -lt $size; $x++) {
      $px = $stage.GetPixel($x, $y)
      $lo = [math]::Min($px.R, [math]::Min($px.G, $px.B))
      $a  = 255 - $lo
      if ($a -lt 6) {
        $colour.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        $white.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        continue
      }
      $base = 255 - $a
      $r  = [math]::Max(0, [math]::Min(255, [int][math]::Round(($px.R - $base) * 255.0 / $a)))
      $gg = [math]::Max(0, [math]::Min(255, [int][math]::Round(($px.G - $base) * 255.0 / $a)))
      $b  = [math]::Max(0, [math]::Min(255, [int][math]::Round(($px.B - $base) * 255.0 / $a)))
      $colour.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, $r, $gg, $b))
      $white.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 255, 255, 255))
    }
  }
  $stage.Dispose()
  return @($colour, $white)
}

# --- 32px tab icons -----------------------------------------------------------
# Full bleed: at 32px every pixel of padding is a pixel of lost legibility.
$m32 = New-Mark 32 1.0
$m32[0].Save("$outDir\icon-light-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)  # light chrome -> colour ink
$m32[1].Save("$outDir\icon-dark-32x32.png",  [System.Drawing.Imaging.ImageFormat]::Png)  # dark chrome  -> reversed white

# --- apple-touch icon ---------------------------------------------------------
# iOS composites touch icons onto black if they are transparent, so this one is
# an opaque navy tile with the reversed mark and breathing room for the rounding.
$apple = New-Object System.Drawing.Bitmap(180, 180, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$ga = [System.Drawing.Graphics]::FromImage($apple)
$ga.Clear([System.Drawing.Color]::FromArgb(255, 21, 42, 77))   # brand navy #152a4d
$ga.InterpolationMode = 'HighQualityBicubic'
$m180 = New-Mark 180 0.70
$ga.DrawImage($m180[1], 0, 0, 180, 180)
$ga.Dispose()
$apple.Save("$outDir\apple-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# --- favicon.ico (16 / 32 / 48, PNG-encoded entries) --------------------------
$sizes = @(16, 32, 48)
$blobs = @()
foreach ($s in $sizes) {
  $m = New-Mark $s 1.0
  $ms = New-Object System.IO.MemoryStream
  $m[0].Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  $blobs += ,@($s, $ms.ToArray())
  $ms.Dispose(); $m[0].Dispose(); $m[1].Dispose()
}
$fs = [System.IO.File]::Create("$outDir\favicon.ico")
$bw = New-Object System.IO.BinaryWriter($fs)
$bw.Write([uint16]0); $bw.Write([uint16]1); $bw.Write([uint16]$blobs.Count)   # ICONDIR
$offset = 6 + 16 * $blobs.Count
foreach ($b in $blobs) {
  $bw.Write([byte]$b[0]); $bw.Write([byte]$b[0])   # width, height
  $bw.Write([byte]0); $bw.Write([byte]0)           # palette, reserved
  $bw.Write([uint16]1); $bw.Write([uint16]32)      # planes, bpp
  $bw.Write([uint32]$b[1].Length); $bw.Write([uint32]$offset)
  $offset += $b[1].Length
}
foreach ($b in $blobs) { $bw.Write($b[1]) }
$bw.Flush(); $bw.Close(); $fs.Close()

# --- proof sheet: actual size + 8x magnified, on light and dark chrome --------
$proof = New-Object System.Drawing.Bitmap(560, 240)
$gp = [System.Drawing.Graphics]::FromImage($proof)
$gp.Clear([System.Drawing.Color]::FromArgb(248, 248, 250))
$gp.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(32, 33, 36))), 0, 120, 560, 120)
$gp.InterpolationMode = 'NearestNeighbor'
$gp.PixelOffsetMode = 'Half'
$gp.DrawImage($m32[0], 24, 44, 32, 32)
$gp.DrawImage($m32[0], 90, 12, 96, 96)
$gp.DrawImage($m32[1], 24, 164, 32, 32)
$gp.DrawImage($m32[1], 90, 132, 96, 96)
$gp.InterpolationMode = 'HighQualityBicubic'
$gp.DrawImage($apple, 220, 24, 84, 84)
$gp.DrawImage($apple, 220, 144, 84, 84)
$gp.DrawImage($m32[0], 340, 52, 16, 16)
$gp.DrawImage($m32[1], 340, 172, 16, 16)
$gp.Dispose()
$proof.Save("$scratch\favicon-proof.png", [System.Drawing.Imaging.ImageFormat]::Png)

$m32[0].Dispose(); $m32[1].Dispose(); $m180[0].Dispose(); $m180[1].Dispose()
$apple.Dispose(); $src.Dispose()

foreach ($f in @('icon-light-32x32.png','icon-dark-32x32.png','apple-icon.png','favicon.ico')) {
  "{0,-26} {1} bytes" -f $f, (Get-Item "$outDir\$f").Length
}
