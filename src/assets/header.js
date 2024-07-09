$(".language").hover(function() {
  $(".lang_popup").show()
}, function() {
  $(".lang_popup").hide()
});
var flag = !0;
$(".main_Mright").click(function() {
  flag ? ($(".Mright_line").css({
      background: "transparent"
  }),
  $(this).addClass("Mright_active"),
  $(".Main_popup").css({
      height: "88vh"
  }),
  flag = !flag) : ($(".Mright_line").css({
      background: "black"
  }),
  $(this).removeClass("Mright_active"),
  $(".Main_popup").css({
      height: "0"
  }),
  flag = !flag)
}),
$(".Mnav").click(function() {
  var Toheight = $(this).next(".Mnav_link")[0].scrollHeight
    , height = $(this).next(".Mnav_link").css("height");
  height == "0px" ? ($(this).children(".Mnav_right").addClass("Mnav_active"),
  $(this).next(".Mnav_link").css({
      height: "".concat(Toheight, "px")
  })) : ($(this).children(".Mnav_right").removeClass("Mnav_active"),
  $(this).next(".Mnav_link").css({
      height: "0"
  }))
}),
$(".nav a").hover(function() {
  var index = $(this).index();
  $(".nav a").css({
      color: "black"
  }),
  $(this).css({
      color: "#44d62c"
  }),
  index != 4 && ($(".main_popup".concat(index + 1)).css({
      height: eval("$('.main_popup".concat(index + 1, "')[0].scrollHeight"))
  }),
  $(".main_mask").css({
      height: "96vh"
  }))
}, function() {
  $(this).css({
      color: "black"
  });
  var index2 = $(this).index();
  index2 != 4 && ($(".main_popup".concat(index2 + 1)).css({
      height: "0"
  }),
  $(".main_mask").css({
      height: "0"
  }))
}),
$(".main_popup").hover(function() {
  var str = $(this)[0].classList[0]
    , index = str.substring(10);
  $(this).css({
      height: eval("$('.main_popup".concat(index, "')[0].scrollHeight"))
  }),
  $(".nav a:nth-child(".concat(index, ")")).css({
      color: "#44d62c"
  }),
  $(".main_mask").css({
      height: "96vh"
  })
}, function() {
  var str2 = $(this)[0].classList[0]
    , index2 = str2.substring(10);
  $(".nav a:nth-child(".concat(index2, ")")).css({
      color: "black"
  }),
  $(this).css({
      height: "0"
  }),
  $(".main_mask").css({
      height: "0"
  })
}),
$(".mp_item").hover(function() {
  $(this).children().children(".mp_img").children("img").css({
      transform: "scale(1.1)"
  }),
  $(this).find("span").css({
      color: "#44d62c"
  })
}, function() {
  $(this).children().children(".mp_img").children("img").css({
      transform: "scale(1)"
  }),
  $(this).find("span").css({
      color: "black"
  })
}),
$(".mp_nav div").hover(function() {
  var index2 = $(this).index() + 1;
  $(".mp_nav div").css({
      color: "black"
  }),
  $(this).css({
      color: "#44d62c"
  }),
  $(".mp_content .mp_product").hide(),
  $(".mp_content .mp_product:nth-child(".concat(index2, ")")).show()
});
//# sourceMappingURL=/cdn/shop/t/7/assets/header.js.map?v=14760138470077502611710120273
