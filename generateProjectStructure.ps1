# Zapisz ten skrypt jako generateProjectStructure.ps1

function Get-DirectoryTree {
    param (
        [string]$Path,
        [string]$Indent = "",
        [string[]]$IgnorePatterns
    )

    $items = Get-ChildItem -Path $Path
    foreach ($item in $items) {
        $relativePath = $item.FullName.Substring($Path.Length + 1)
        $skip = $false

        foreach ($pattern in $IgnorePatterns) {
            if ($relativePath -like $pattern) {
                $skip = $true
                break
            }
        }

        if (-not $skip) {
            if ($item.PSIsContainer) {
                Write-Output "$Indent$item/"
                Get-DirectoryTree -Path $item.FullName -Indent "$Indent  " -IgnorePatterns $IgnorePatterns
            } else {
                Write-Output "$Indent$item"
            }
        }
    }
}

# Funkcja do odczytywania .gitignore i konwersji wzorców do formatu PowerShell
function Get-GitIgnorePatterns {
    param (
        [string]$GitIgnorePath
    )

    $patterns = @()
    if (Test-Path $GitIgnorePath) {
        $gitignoreContent = Get-Content $GitIgnorePath | Where-Object { $_ -and ($_ -notmatch '^#') }
        foreach ($line in $gitignoreContent) {
            $pattern = $line.Trim()
            if ($pattern -notlike '\*') {
                $pattern = "*$pattern*"
            }
            $patterns += $pattern
        }
    }
    return $patterns
}

# Ścieżka do katalogu projektu
$projectDir = "."

# Ścieżka do pliku .gitignore
$gitIgnorePath = "$projectDir\.gitignore"

# Sprawdzenie, czy ścieżka istnieje
if (Test-Path $projectDir) {
    Write-Output "Struktura projektu:"
    $ignorePatterns = Get-GitIgnorePatterns -GitIgnorePath $gitIgnorePath
    Get-DirectoryTree -Path $projectDir -IgnorePatterns $ignorePatterns
} else {
    Write-Output "Katalog $projectDir nie istnieje."
}
