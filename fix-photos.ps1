# Fix incomplete photo URLs in seed.ts
$seedFile = 'd:\Projects\Coy_assignment\lib\seed.ts'
$content = Get-Content $seedFile -Raw

# Replace all incomplete 'https: patterns with complete Unsplash URLs
$content = $content -replace "photos:\s*\[\s*'https:[^\]]*\]", @'
photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ]
'@

# Write back
Set-Content $seedFile -Value $content -NoNewline

Write-Host "Fixed photo URLs in seed.ts"
