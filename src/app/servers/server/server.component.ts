import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, 
    private routes: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // const serverId = this.routes.snapshot.params["id"];
    // this.server = this.serversService.getServer(serverId);
    this.routes.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );

  }

  editServer() {
    this.router.navigate(['edit'], {relativeTo: this.routes, queryParamsHandling: 'preserve'});
  }

}
