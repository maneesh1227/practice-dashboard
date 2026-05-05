import { Component, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, ButtonModule, DrawerModule, RippleModule, Drawer],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  visible: boolean = false;

  // @ViewChild('drawerRef') drawerRef!: Drawer;
  
  //   closeCallback(e: Event): void {
  //       this.drawerRef.close(e);
  //   }

}
