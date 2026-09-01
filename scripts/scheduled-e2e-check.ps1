# Hum Qadam — scheduled morning E2E check
# Registered as Windows Task Scheduler task "HumQadam_MorningE2E".
# Runs `claude -p` headlessly against the live site using the Chrome DevTools
# MCP. The prompt (scripts/e2e-check-prompt.txt) tells Claude to stay silent
# on a pass and call PushNotification only on a failure — this script's only
# job is to run it and keep a timestamped, on-disk log of every run as proof
# it actually fired, independent of whatever Claude itself reports.

$ErrorActionPreference = "Stop"
$root = "C:\Users\HP\Test"
Set-Location $root

$logDir = Join-Path $root "logs\e2e-scheduled"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logFile = Join-Path $logDir "$stamp.log"

$prompt = Get-Content -Raw -Path (Join-Path $root "scripts\e2e-check-prompt.txt")

"===== Scheduled E2E run started: $(Get-Date -Format o) =====" | Out-File -FilePath $logFile -Append -Encoding utf8

try {
    # --output-format stream-json makes every tool call (including
    # PushNotification, if the run decides to fire one) show up as its own
    # JSON line in the log, not just the final text summary -- that's the
    # actual proof the alert fired, not just Claude's word for it.
    $rawLines = & claude -p $prompt --permission-mode auto --output-format stream-json --verbose 2>&1
    $rawLines | Out-File -FilePath $logFile -Append -Encoding utf8

    "" | Out-File -FilePath $logFile -Append -Encoding utf8
    "----- PushNotification calls in this run -----" | Out-File -FilePath $logFile -Append -Encoding utf8
    $notifyLines = $rawLines | Where-Object { $_ -match '"name"\s*:\s*"PushNotification"' }
    if ($notifyLines) {
        $notifyLines | Out-File -FilePath $logFile -Append -Encoding utf8
    } else {
        "(none -- no notification was sent this run)" | Out-File -FilePath $logFile -Append -Encoding utf8
    }
} catch {
    "RUNNER ERROR: $($_.Exception.Message)" | Out-File -FilePath $logFile -Append -Encoding utf8
}

"===== Scheduled E2E run finished: $(Get-Date -Format o) =====" | Out-File -FilePath $logFile -Append -Encoding utf8
