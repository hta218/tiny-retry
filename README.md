# Dotfiles

Personal configuration files for macOS development environment.

## Structure

```
.
├── zsh/          # Shell configuration
├── vscode/       # VS Code settings
├── claude/       # Claude Code settings  
├── opencode/     # Opencode settings
└── scripts/      # Setup scripts
```

## Installation

Run the install script to symlink all configs:

```bash
./scripts/install.sh
```

## Manual Setup

If you prefer manual setup:

```bash
# Zsh
ln -sf ~/Documents/personal/code/dotfiles/zsh/.zshrc ~/.zshrc

# VS Code
ln -sf ~/Documents/personal/code/dotfiles/vscode/settings.json ~/Library/Application\ Support/Code/User/settings.json
ln -sf ~/Documents/personal/code/dotfiles/vscode/keybindings.json ~/Library/Application\ Support/Code/User/keybindings.json

# Claude Code
ln -sf ~/Documents/personal/code/dotfiles/claude/settings.json ~/.claude/settings.json

# Opencode
ln -sf ~/Documents/personal/code/dotfiles/opencode/settings.json ~/.config/opencode/settings.json
```

## Security Note

This repo is public. Never commit:
- API keys or tokens
- Personal paths or usernames
- SSH keys
- `.env` files with real values

Use environment variables or secret managers (1Password, Bitwarden) instead.
