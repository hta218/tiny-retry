#!/bin/bash
input=$(cat)

MODEL_RAW=$(echo "$input" | jq -r '.model.display_name // "Claude"')
DIR=$(echo "$input" | jq -r '.workspace.current_dir // "."')

# Shorten model name: "claude-sonnet-4-5" or "Claude Sonnet 4.5" -> "Sonnet 4.5"
MODEL=$(echo "$MODEL_RAW" \
  | sed 's/[Cc]laude[- ]//g' \
  | sed 's/\([0-9]\)-\([0-9]\)/\1.\2/g' \
  | sed 's/-/ /g' \
  | sed 's/  */ /g' \
  | sed 's/\[/ [/' \
  | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2); print}')

# Emoji prefix per model
MODEL_LOWER=$(echo "$MODEL" | tr '[:upper:]' '[:lower:]')
case "$MODEL_LOWER" in
  *opus*)   MODEL="🧠 ${MODEL}" ;;
  *sonnet*) MODEL="⚡ ${MODEL}" ;;
  *haiku*)  MODEL="🪶 ${MODEL}" ;;
esac

# Colors for light background
BLACK='\033[30m'
DARK_GRAY='\033[90m'
GREEN='\033[32m'
RED='\033[31m'
RESET='\033[0m'

SEP=" ${DARK_GRAY}|${RESET} "

# Short dir: last two path segments
SHORT_DIR=$(echo "$DIR" | awk -F'/' '{if(NF>=2) print $(NF-1)"/"$NF; else print $NF}')

# Git branch + dirty status (inline with dir)
GIT_PART=""
if git -C "$DIR" rev-parse --git-dir > /dev/null 2>&1; then
  BRANCH=$(git -C "$DIR" branch --show-current 2>/dev/null)
  if [ -n "$BRANCH" ]; then
    if git -C "$DIR" diff --quiet 2>/dev/null && git -C "$DIR" diff --cached --quiet 2>/dev/null; then
      DIRTY="${GREEN}✓${RESET}"
    else
      DIRTY="${RED}✗${RESET}"
    fi
    GIT_PART=" ${DARK_GRAY}(${RESET}${GREEN}⎇ ${BRANCH}${RESET} ${DIRTY}${DARK_GRAY})${RESET}"
  fi
fi

echo -e "${BLACK}${MODEL}${RESET}${SEP}${SHORT_DIR}${GIT_PART}"