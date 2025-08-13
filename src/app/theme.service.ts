import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'theme';

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  init() {
    const saved = (localStorage.getItem(this.KEY) as Theme) || 'light';
    this.apply(saved);
  }

  toggle() {
    const now: Theme = this.doc.documentElement.classList.contains('dark-theme') ? 'light' : 'dark';
    this.apply(now);
  }

  private apply(theme: Theme) {
    const html = this.doc.documentElement; // <html>
    html.classList.remove('light-theme', 'dark-theme');
    html.classList.add(`${theme}-theme`);
    localStorage.setItem(this.KEY, theme);
  }
}