#!/usr/bin/env python3
"""Regression guard for the approved V24 catalog; no network or third-party streams."""
import html
import json
import pathlib
import re

page = pathlib.Path("preview-integrado-v24.html").read_text(encoding="utf-8")
match = re.search(r"const channels=(\[.*?\]);const frame=", page, re.S)
assert match, "V24 catalog not found"
channels = json.loads(match.group(1))
assert len(channels) == 21, f"Expected 21 V24 channels, got {len(channels)}"
names = [c["name"] for c in channels]
assert len(names) == len(set(names)), "Duplicate channel names"
assert all(c.get("url", "").startswith("https://") for c in channels), "Non-HTTPS or missing source"
assert next(c for c in channels if c["name"] == "Cultura Fast")["category"] == "TV"
assert next(c for c in channels if c["name"] == "Bob Esponja")["kind"] == "hls"
print("PASS: V24 21-channel baseline, unique names, HTTPS sources, Cultura Fast, Bob Esponja")
print("NOTE: this checks catalog integrity, not live playback, licensing, or Lovable parity.")
