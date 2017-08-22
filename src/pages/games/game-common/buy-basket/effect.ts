/**
 * Created by apple on 2016/12/28.
 */
import * as $ from 'jquery';
export class Effect{

  constructor(){

  }

  initEffect(){
    this.moneyDrop();
  }
  moneyDrop() {

    $('.money-btn-1').each(function () {
      let This = $(this);
      let oLi = This.next('.money-menu').find('li');
      This.click(function () {
        $(this).next('.money-menu').slideDown(200);
        return false;
      });

      oLi.click(function () {
        oLi.removeClass('active');
        $(this).addClass('active');
        This.find('i').text($(this).text());
      })
    });
    $(document).on('touchstart',function () {
      $('.money-menu').slideUp(200);
    });
  }
}
