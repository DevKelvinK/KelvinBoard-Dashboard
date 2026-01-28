import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  codeHttp = 404;

  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) { 
    const code = this.route.snapshot.queryParamMap.get('code')
    this.codeHttp = code ? Number(code) : 404
  }

  goBack() {
    this.location.back()
  }
}
