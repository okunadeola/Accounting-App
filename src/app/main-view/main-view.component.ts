import { Component, OnInit  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
    public id: any;
  constructor(private breakpointObserver: BreakpointObserver, public actRoute : ActivatedRoute, public service : ServiceService, public route : Router) {}


  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this.service.id.next(this.id)
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let finder: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );

    })  
  }

  logout() {
    localStorage.removeItem('accoutLogin');
    this.route.navigate(['/']);
  }

}