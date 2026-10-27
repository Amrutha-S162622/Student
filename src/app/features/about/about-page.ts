import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page', standalone: true,
  template: `<p class="eyebrow">ABOUT THIS WORKSPACE</p><h1>Campus Desk</h1><p class="lede">A student management workspace for keeping enrollment records organized and easy to act on.</p><section><h2>Built with</h2><div class="tech"><span>Angular 20</span><span>Angular Material</span><span>Bootstrap 5</span><span>TypeScript</span></div><p>This frontend demonstration keeps authentication and student records in memory. Changes reset when the application is refreshed or the administrator logs out.</p><p class="placeholder">Developer: [Your Name]</p></section>`,
  styles: [`:host{display:block;max-width:760px;margin:20px auto;color:#20332e}.eyebrow{font-size:9px;font-weight:700;letter-spacing:1.5px;color:#81928b}h1{font:400 42px Georgia,serif;letter-spacing:0;margin:12px 0}.lede{max-width:560px;color:#718078;font-size:15px;line-height:1.7}section{margin-top:35px;padding-top:24px;border-top:1px solid #dfe7e2}h2{font:400 24px Georgia,serif}.tech{display:flex;flex-wrap:wrap;gap:9px;margin:17px 0 23px}.tech span{padding:8px 10px;background:#e9f0e9;color:#486958;font-size:11px;border-radius:3px}section>p{font-size:12px;color:#738079;line-height:1.7}.placeholder{margin-top:28px}`]
})
export class AboutPage {}