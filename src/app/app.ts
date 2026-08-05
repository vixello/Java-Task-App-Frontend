import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { FaConfig, FaIconLibrary, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { Navbar } from "./layout/navbar/navbar";
import { Footer } from "./layout/footer/footer";
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'taskapp-root',
  imports: [RouterOutlet, FaIconComponent, Navbar, Footer, RouterLinkWithHref],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('task-frontend');
  private faIconLibrary = inject(FaIconLibrary);
  private faConfig = inject(FaConfig);

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const visited = localStorage.getItem('visited');
      if (!visited) {
        localStorage.setItem('visited', 'true');
        this.router.navigate(['']);
      }
      else {
        this.router.navigate(['/tasks'])
      }
    }
  }
  ngOnInit(): void {
    this.initFontAwesome();
  }

  /**
   * Initializes FontAwesome icons and sets default prefix.
   * Summary: Registers icons globally for the app.
   */
  private initFontAwesome() {
    this.faConfig.defaultPrefix = 'far';
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}
