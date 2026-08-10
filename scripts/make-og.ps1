Add-Type -AssemblyName System.Drawing

$outDir = "C:\Users\ROSE MEHRA\Downloads\mvp-exim\public"
$logoPath = "$outDir\logo\mvp-horizontal-light.png"

$W = 1200; $H = 630
$navy   = [System.Drawing.Color]::FromArgb(255, 21, 42, 77)
$cream  = [System.Drawing.Color]::FromArgb(255, 251, 248, 244)
$gold   = [System.Drawing.Color]::FromArgb(255, 224, 158, 84)
$muted  = [System.Drawing.Color]::FromArgb(255, 200, 195, 188)

$bmp = New-Object System.Drawing.Bitmap($W, $H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = 'AntiAlias'
$g.TextRenderingHint = 'ClearTypeGridFit'
$g.InterpolationMode = 'HighQualityBicubic'
$g.PixelOffsetMode   = 'HighQuality'
$g.Clear($navy)

# Warm glow, top-right. PathGradientBrush gives a true radial falloff.
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(760, -300, 760, 760)
$glow = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
$glow.CenterColor = [System.Drawing.Color]::FromArgb(90, 224, 158, 84)
$glow.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 21, 42, 77))
$g.FillPath($glow, $path)
$glow.Dispose(); $path.Dispose()

# Reversed logo lockup, top-left.
$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoW = 430
$logoH = [int][math]::Round($logoW * $logo.Height / $logo.Width)
$g.DrawImage($logo, 80, 72, $logoW, $logoH)
$logo.Dispose()

# Headline. Georgia is a traditional high-contrast serif and is present on every
# Windows box; the brand face (Fraunces) is a webfont and is not installed, so
# this stands in for it here only.
$fontHead = New-Object System.Drawing.Font('Georgia', 42, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontSub  = New-Object System.Drawing.Font('Segoe UI', 25, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontFoot = New-Object System.Drawing.Font('Segoe UI', 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$brushCream = New-Object System.Drawing.SolidBrush($cream)
$brushGold  = New-Object System.Drawing.SolidBrush($gold)
$brushMuted = New-Object System.Drawing.SolidBrush($muted)

$fmt = New-Object System.Drawing.StringFormat
$fmt.Trimming = [System.Drawing.StringTrimming]::Word

$headRect = New-Object System.Drawing.RectangleF(80, 300, 900, 160)
$g.DrawString("Quality Indian produce,`nshipped worldwide.", $fontHead, $brushCream, $headRect, $fmt)

# Built from the code point, not typed literally: PowerShell 5.1 reads this
# file as ANSI, so a literal U+00B7 arrives as the two-char mojibake "Â·".
$d = [char]0x00B7
$g.DrawString("Semi-husked coconut  $d  HS 0801 19 10  $d  EXW $d FOB $d CIF $d DDP",
  $fontSub, $brushGold, (New-Object System.Drawing.RectangleF(80, 452, 1040, 40)), $fmt)

# Footer rule + strap
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(46, 255, 255, 255), 1)
$g.DrawLine($pen, 80, 540, ($W - 80), 540)
$pen.Dispose()

$g.DrawString("Merchant exporter  $d  Bengaluru, India", $fontFoot, $brushMuted,
  (New-Object System.Drawing.RectangleF(80, 562, 700, 34)), $fmt)

$fmtRight = New-Object System.Drawing.StringFormat
$fmtRight.Alignment = [System.Drawing.StringAlignment]::Far
$g.DrawString("mvpexim.com", $fontFoot, $brushMuted,
  (New-Object System.Drawing.RectangleF(($W - 480), 562, 400, 34)), $fmtRight)

$g.Dispose()
$bmp.Save("$outDir\og.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$fontHead.Dispose(); $fontSub.Dispose(); $fontFoot.Dispose()
$brushCream.Dispose(); $brushGold.Dispose(); $brushMuted.Dispose()

$f = Get-Item "$outDir\og.png"
"og.png  1200x630  $([math]::Round($f.Length/1kb,1)) KB"
