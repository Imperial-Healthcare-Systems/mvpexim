Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\ROSE MEHRA\Downloads\mvp-exim\public\logo\mvp-horizontal.png"
$outDir  = "C:\Users\ROSE MEHRA\Downloads\mvp-exim\public\logo"

$src = [System.Drawing.Image]::FromFile($srcPath)

# Ink bounding box, measured on a 400x200 proxy then mapped back to full res
# (padded outward by one proxy pixel so nothing can clip).
$scale = $src.Width / 400.0
$cropX = [int]([math]::Floor(20 * $scale))
$cropY = [int]([math]::Floor(40 * $scale))
$cropW = [int]([math]::Ceiling((380 - 20 + 1) * $scale))
$cropH = [int]([math]::Ceiling((175 - 40 + 1) * $scale))
"crop rect on original : x=$cropX y=$cropY w=$cropW h=$cropH"

# Target render size: 144px tall = 3x the 48px on-screen height, for HiDPI.
$outH = 144
$outW = [int][math]::Round($outH * ($cropW / $cropH))
"output size           : ${outW}x${outH}"

$stage = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($stage)
$g.Clear([System.Drawing.Color]::White)
$g.InterpolationMode = 'HighQualityBicubic'
$g.PixelOffsetMode   = 'HighQuality'
$g.SmoothingMode     = 'HighQuality'
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $outW, $outH)),
                   $cropX, $cropY, $cropW, $cropH, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$src.Dispose()

# Key pure white to alpha. The art is dark ink on a pure-white field, so
# alpha = 255 - min(R,G,B) and then un-premultiplying against white recovers
# the ink colour exactly: compositing the result back over white is lossless.
$colour = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$light  = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $outH; $y++) {
  for ($x = 0; $x -lt $outW; $x++) {
    $px = $stage.GetPixel($x, $y)
    $lo = [math]::Min($px.R, [math]::Min($px.G, $px.B))
    $a  = 255 - $lo
    if ($a -lt 8) {
      $colour.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
      $light.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
      continue
    }
    $base = 255 - $a
    $r = [math]::Max(0, [math]::Min(255, [int][math]::Round(($px.R - $base) * 255.0 / $a)))
    $gg = [math]::Max(0, [math]::Min(255, [int][math]::Round(($px.G - $base) * 255.0 / $a)))
    $b  = [math]::Max(0, [math]::Min(255, [int][math]::Round(($px.B - $base) * 255.0 / $a)))
    $colour.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, $r, $gg, $b))
    # Reversed lockup: same coverage mask, ink forced to white.
    $light.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 255, 255, 255))
  }
}
$stage.Dispose()

$colour.Save("$outDir\mvp-horizontal-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$light.Save("$outDir\mvp-horizontal-light.png",  [System.Drawing.Imaging.ImageFormat]::Png)
$colour.Dispose(); $light.Dispose()

foreach ($f in @('mvp-horizontal-dark.png','mvp-horizontal-light.png')) {
  $i = [System.Drawing.Image]::FromFile("$outDir\$f")
  "{0,-28} {1}x{2}  {3} KB" -f $f, $i.Width, $i.Height, [math]::Round((Get-Item "$outDir\$f").Length/1kb,1)
  $i.Dispose()
}
