Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('C:\Users\Juliana Lima\Desktop\Nuv\nuv-app\public\logo_nuv.png')
$bmp = new-object System.Drawing.Bitmap($img)
$width = $bmp.Width
$height = $bmp.Height

Write-Host "Image size: ${width}x${height}"

# Sample a few pixels to find a non-transparent, non-black/white color
$samples = @(
  $bmp.GetPixel(0,0),
  $bmp.GetPixel($width/2, $height/2),
  $bmp.GetPixel($width/4, $height/4),
  $bmp.GetPixel($width/2, 10),
  $bmp.GetPixel(10, $height/2)
)

foreach ($p in $samples) {
  $hex = '#{0:X2}{1:X2}{2:X2}' -f $p.R, $p.G, $p.B
  Write-Host "Pixel A:$($p.A) R:$($p.R) G:$($p.G) B:$($p.B) HEX: $hex"
}

$img.Dispose()
$bmp.Dispose()
