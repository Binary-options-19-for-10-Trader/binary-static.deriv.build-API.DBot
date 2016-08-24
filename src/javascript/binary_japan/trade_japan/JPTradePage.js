var JPTradePage = (function() {

  var scriptUrl = 'https://binary-com.github.io/japanui/dist/bundle.js';
  var isJapan = false;
  var scriptReady = false;

  var getScript = function(cb) {
    var options = { dataType: 'script', cache: true, url: scriptUrl };

    if (!scriptReady) {
      $.ajax(options).done(function() {
        scriptReady = true;
        cb();
      });
    } else {
      cb();
    }
  };

  var onLoad = function() {
    isJapan = true;

    getScript(function() { JapanTrading.start(); });

    Content.populate();
    TradingAnalysis.bindAnalysisTabEvent();

    window.chartAllowed = true;
  };

  var reload = function() {
    window.location.reload();
  };

  var onUnload = function() {
    window.chartAllowed = false;
    isJapan = false;
    JapanTrading.stop();
    PortfolioWS.onUnload();
  };

  return {
    onLoad: onLoad,
    reload: reload,
    onUnload: onUnload,
    isJapan: function() {
      return isJapan;
    }
  };
})();
