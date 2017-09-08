<!--和值-->
<div class="game-list" *ngIf="of gameconfigdata.defaultsMethodData?.c?.ishezhi">
  <ul class="k3-num-list">
  <li class="k3-li" *ngFor="let v of of gameconfigdata.defaultsMethodData?.c?.selectarea; let key = index;">
<i (touchstart)="util.chooseBall(key,gameconfigdata.defaultsMethodData?.c.selectarea,c)" class="num-black" [class.num-yellow]="v">{{gameconfigdata.defaultsMethodData?.c?.selectareaPair[key]}}</i>
</li>
</ul>
</div>

<div *ngIf="!gameconfigdata.defaultsMethodData?.c?.ishezhi" class="game-list">
  <div class="k3-same-2" *ngIf="c.leveltwo">
<div *ngFor="let items of of gameconfigdata.defaultsMethodData?.c?.selectareaPair; let pindex = index;">
<ul [class.num-yellow]="gameconfigdata.defaultsMethodData?.c?.selectarea[pindex][key]" class="k3-list" *ngFor="let v of items;let key = index;" (touchstart)="util.chooseBall(key,gameconfigdata.defaultsMethodData?.c.selectarea[pindex],gameconfigdata.defaultsMethodData?.c)">
  <li class="k3-li" *ngFor="let num of (''+v).split('')"><i class="saizi saizi-{{num}}"></i></li>
</ul>

<ul class="k3-list k3-list-2" *ngIf="gameconfigdata.defaultsMethodData?.c.isertonghao">
<li *ngFor="let v of [pindex+1,pindex+1]" class="k3-li"><i class="saizi saizi-{{v}}"></i></li>
</ul>
</div>
</div>

<div class="k3-same-2" *ngIf="!gameconfigdata.defaultsMethodData?.c?.leveltwo">
<ul [class.num-yellow]="gameconfigdata.defaultsMethodData?.c?.selectarea[key]" class="k3-list" *ngFor="let v of gameconfigdata.defaultsMethodData?.c?.selectareaPair;let key = index;" (touchstart)="util.chooseBall(key,gameconfigdata.defaultsMethodData?.c?.selectarea,gameconfigdata.defaultsMethodData?.c)">
  <li class="k3-li" *ngFor="let num of (''+v).split('')"><i class="saizi saizi-{{num}}"></i></li>
</ul>
</div>

</div>
