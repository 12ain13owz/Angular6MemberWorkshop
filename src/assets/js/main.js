"use strict"
const App = {
  initilaLoadPage: function () {
    var treeviewMenu = $('.app-menu');

    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $('.app').toggleClass('sidenav-toggled');
    });

    // Activate sidebar treeview toggle
    $("[data-toggle='treeview']").click(function (event) {
      event.preventDefault();
      if (!$(this).parent().hasClass('is-expanded')) {
        treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
      }
      $(this).parent().toggleClass('is-expanded');
    });

    // Set initial active toggle
    $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

    //Activate bootstrip tooltips
    $("[data-toggle='tooltip']").tooltip();
  },

  ForgotPassword: function () {
    $('.login-content [data-toggle="flip"]').click(function () {
      $('.login-box').toggleClass('flipped');
      return false;
    });
  },

  BootstrapLoadPage: function () {
    $('.bs-component [data-toggle="popover"]').popover();
    $('.bs-component [data-toggle="tooltip"]').tooltip();
  }
}
