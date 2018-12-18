import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate.service';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  isSaved = false;

  constructor(private serversService: ServersService, private routes: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.routes.snapshot.queryParams);
    // console.log(this.routes.snapshot.fragment);
    this.routes.params.
      subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
        }
      );
    this.routes.queryParams.
      subscribe(
        (params: Params) => {
          this.allowEdit = params['allowEdit'] === '1' ? true : false;
        }
      );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.isSaved = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit) {
      return true;
    }

    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.isSaved) {
      return confirm("Do You want to discard the changes?");
    } else {
      return true;
    }
  }

}
