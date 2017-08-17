/**
 * Created by apple on 2016/12/28.
 */
import * as $ from 'jquery';

export class Effect {
  constructor() {

  }

  initEffect() {
    this.dropDown();
    this.rechargeTab();
    this.myModal();
    this.sideDrop();
    this.phoneClick('.j-btn', 'gray-on');
    this.phoneClick('.s-btn', 'orange-on');
    this.waterEffect('.bt');
    this.waterEffect('.black-bt');
  }

  phoneClick(obj, cla) {
    $(document).on('touchstart', obj, function () {
      $(this).addClass(cla);
    });
    $(document).on('touchend', obj, function () {
      let This = $(this);
      setTimeout(function () {
        This.removeClass(cla);
      }, 150)
    });
  }

  //水波纹效果
  waterEffect(obj) {
    $(document).on('touchstart', obj, function (e) {
      let newRound = document.createElement('div'), x, y;
      newRound.className = 'circles';
      this.appendChild(newRound);
      x = e.pageX - $(this).offset().left;
      y = e.pageY - $(this).offset().top;
      newRound.style.left = x + "px";
      newRound.style.top = y + "px";
      newRound.className += " animations";
      setTimeout(function () {
        newRound.remove();
      }, 400);
    });
  }

  //左侧彩种下拉
  sideDrop() {
    $(document).on('touchstart', '.side-li', drop);

    function drop() {
      $(this).find('.side-drop').slideToggle(200);
      $(this).siblings().find('.side-drop').slideUp(200);
      return false;
    }

    $(document).on('touchstart', function () {
      $('.side-drop').slideUp(200);
    });
  }

  //首页彩种下拉
  dropDown() {
    $(document).on('touchstart', '.sort-li', drop);

    function drop() {
      let oSort = $('.sort-li');
      let len = oSort.length;

      function aaa() {
        for (var i = 0; i < len; i++) {
          if ($('.sort-list').find('.sort-drop').eq(i).css('display') == 'block') {
            return true;
          }
        }
        return false;
      }

      if (aaa()) {
        oSort.find('.sort-a').removeClass('sort-col');
        oSort.find('.definite-sort').removeClass('sort-col');
        oSort.find('.sort-drop').hide()
      } else {
        $(this).find('.sort-a').addClass('sort-col');
        $(this).find('.definite-sort').addClass('sort-col');
        $(this).find('.sort-drop').slideDown();
      }
      return false;
    }

    $(document).on('touchstart', function () {
      $('.sort-li').find('.sort-a').removeClass('sort-col');
      $('.sort-li').find('.definite-sort').removeClass('sort-col');
      $('.sort-drop').slideUp(0);
    });
  }

  //tab切换
  rechargeTab() {
    $(document).on('touchstart', '.recharge-tab li', recharge);

    function recharge() {
      let oDiv = $('.recharge');
      let i = $(this).index();
      $('.recharge-tab li').removeClass('active');
      $(this).addClass('active');
      oDiv.each(function () {
        $(this).find('.recharge-con').hide().eq(i).show();
      });
    }
  }

  //从下往上的弹出框
  myModal() {
    $(document).on('touchstart', '.open-modal', function () {
      $('.body-bg').fadeIn(300);
      $('.alert-con').addClass('alert-show');
    });
    $(document).on('touchstart', '.body-bg,.close-modal', function () {
      $('.body-bg').fadeOut(300);
      $('.alert-con').removeClass('alert-show');
    });
  }

}


