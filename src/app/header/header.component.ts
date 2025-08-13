import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../theme.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-header',
    imports: [ MatIconModule ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
    isDark = false;

    constructor(private theme: ThemeService) {}

    ngOnInit() {
        this.isDark = document.documentElement.classList.contains('dark-theme');
    }

    onToggleTheme() {
        this.theme.toggle();
        this.isDark = document.documentElement.classList.contains('dark-theme');
    }
    
}