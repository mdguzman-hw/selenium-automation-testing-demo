# Selenium Automation Testing - DEMO
#### Web - Automated Testing
MDG 2026

---
# Environment Versions
- macOS Tahoe Version 26.2 (25C56)
- Homebrew 5.0.13
- node v25.5.0
- Yarn 1.22.22
- Google Chrome Version 144.0.7559.110
- ChromeDriver 144.0.7559.96
- Jest 30.2.0
- TypeScript 5.9.3
---
# Install Instruction
1. In terminal, navigate to project root directory
2. Run *yarn install*

---
# Test Suites
### ALL
- yarn test
### SMOKE TEST <span style="color:#4055f5">[ LEGACY ]</span>
Pure TypeScript
- *yarn smoke-legacy*
### SMOKE TEST <span style="color:#948a8a">[ INCOMPLETE ]</span>
- *yarn smoke*
### BUILD ACCEPTANCE TEST <span style="color:#defa64">[ IN PROGRESS ]</span>
- *mkdir logs*
- *touch CREDENTIALS.json*
```
CREDENTIALS.json template
{
	"personal": {
		"email": "",
		"password": ""
	},
	"demo": {
		"email": "",
		"password": ""
	}
}
```
- yarn bat
### REGRESSION <span style="color:#080808">[ TBD ]</span>
- TBD
