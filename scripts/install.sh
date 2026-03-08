#!/bin/bash

set -e

DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🔧 Setting up dotfiles from $DOTFILES_DIR..."

# Zsh
echo "→ Linking Zsh config..."
ln -sf "$DOTFILES_DIR/zsh/.zshrc" ~/.zshrc

# VS Code
echo "→ Linking VS Code config..."
VSCODE_DIR="$HOME/Library/Application Support/Code/User"
mkdir -p "$VSCODE_DIR"
ln -sf "$DOTFILES_DIR/vscode/settings.json" "$VSCODE_DIR/settings.json"
ln -sf "$DOTFILES_DIR/vscode/keybindings.json" "$VSCODE_DIR/keybindings.json"

# Claude Code
echo "→ Linking Claude Code config..."
mkdir -p ~/.claude
ln -sf "$DOTFILES_DIR/claude/settings.json" ~/.claude/settings.json

# Opencode
echo "→ Linking Opencode config..."
mkdir -p ~/.config/opencode
ln -sf "$DOTFILES_DIR/opencode/settings.json" ~/.config/opencode/settings.json

echo "✅ Done! Reload your shell or run: source ~/.zshrc"
