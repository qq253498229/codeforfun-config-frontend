import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isCollapsed = false;

    ngOnInit(): void {
        let list = _.drop([1, 2, 3]);
        console.log(list)
    }

}
