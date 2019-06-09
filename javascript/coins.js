var timearray = [];
var storage_array = [];
var coins_array = ["ETH", "ZEC", "USD", "ZEC", "USD"];
var validname_arr = [];
var validvalue_arr = [];
coins_object = {};
five_array = [];
h = 0;
var intervel;



//Better to construct options first and then pass it as a parameter



$(document).ready(function () {
    // ===========================
    // function for search one coin
    // ============================
    $("#search").keyup(function () {

        var allinputs = $("body").find(".coinname");
        console.log(allinputs);
        console.log(allinputs.length);
        for (let t = 0; t < allinputs.length; t++) {
            console.log($(allinputs[t]).text());
            if ($(allinputs[t]).text().toUpperCase().includes($("#search").val().toUpperCase()) == true) {
                $(allinputs[t]).parent().parent().parent().show();
            }
            else {
                $(allinputs[t]).parent().parent().parent().hide();
            }
        }
    });
    // ========================
    // function for all coins
    // ========================
    $(".allcoins").click(function () {
        $(".row").html("");

        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/list",
            success: function (result) {
                console.log(result);
                for (var i = 0, len = 100; i < len; i++) {
                    var checkvalidated;
                    // check if chechbox should be ckecked
                    for (var s = 0; s < five_array.length; s++) {
                        if (five_array[s] == result[i].id.toUpperCase()) {
                            checkvalidated = "checked";
                            console.log("checkvalidated:" +
                                checkvalidated + "*****" + "result[i].id:" +
                                result[i].id.toUpperCase() + "====" + five_array[s] + "^^^^" + i);
                        }

                    }



                    $(".row").append(`
<!-- card -->
<div class="col-lg-3 col-md-6 col-sm-12">
<div class="card">
    <div class="card-body" id=${i}>  
    <input type="checkbox" class="form-check-input" id=${result[i].symbol.toUpperCase()} ${checkvalidated}>
    <label class="form-check-label" for="exampleCheck1">send to report</label>
    <h1 class="card-title coinname">${result[i].name}</h1>
        <h4 class="card-title"><span class="bold">id</span> <span id="identify">${
                        result[i].id
                        }</span></h4>
        <h4 class="card-title"><span class="bold">symbol </span> 
        ${result[i].symbol}</h4>
      
        <button type="button" class="btn btn-info moreinfo" data-toggle="collapse" data-target="#demo${i}">more info</button>
        <div id="demo${i}" class="collapse in">  
        <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
        </div>
    </div>
 </div>
</div>
`);
                    checkvalidated = "";
                }
            }
        });
    });
    // ========================
    // function fo more info
    // ========================
    $("body").on("click", ".moreinfo", function () {
        $(this)
            .parent()
            .toggleClass("opened");
        var coinid = $(this)
            .parent()
            .find("#identify")
            .text();
        var idforstring = $(this)
            .parent()
            .attr("id");
        var flag = $(this)
            .parent()
            .attr("class");
        console.log(flag + "flag");
        var dataplace = $(this).attr("data-target");
        console.log(coinid);
        console.log(dataplace);
        var time = new Date();
        var timenow = time.getTime();
        // ====================================================
        //do actions only when press to more info not less info
        // ====================================================
        if (flag == "card-body opened") {
            // ==============================================================
            // set the condition when fron server and when from local storage
            // ===============================================================
            if (timearray[idforstring] == null || timenow > timearray[idforstring]) {
                // ====================
                // get data from server
                // ====================
                $.ajax({
                    url: `https://api.coingecko.com/api/v3/coins/` + coinid,
                    success: function (result) {
                        $("body").find(`${dataplace}`).html(`
                <div class="row">
                <div class="col-lg-6">  
                <span>from server</span>          
                <span>${
                            result.market_data.current_price.usd
                            }<span class="bold">$</span></span><br> 
                <span>${
                            result.market_data.current_price.eur
                            }<span class="bold">€</span></span><br> 
                <span>${
                            result.market_data.current_price.ils
                            }<span class="bold">₪</span></span><br>    
                </div>
                <div class="col-lg-6">            
                <img src="${
                            result.image.small
                            }" class="rounded" alt="Cinque Terre">           
                </div>
                </div>
                `);
                        // =======================================
                        // set time when ajax requet made to array
                        // =======================================
                        var timeclicked = new Date();

                        countstart = timeclicked.getTime() + 120000;
                        timearray[idforstring] = countstart;
                        console.log(
                            "SERVER" +
                            "the request::" +
                            timearray[idforstring] +
                            "timenow::" +
                            timenow
                        );
                        // ===============================
                        // store the data to local storage
                        // ===============================

                        var checker = localStorage.getItem("coinsdata");
                        if (checker == null) {
                            storage_array = [];
                        } else {
                            storage_array = JSON.parse(localStorage.getItem("coinsdata"));
                        }
                        console.log(storage_array);
                        var thiscoin = {};
                        thiscoin.dollar = result.market_data.current_price.usd;
                        thiscoin.euro = result.market_data.current_price.eur;
                        thiscoin.shekels = result.market_data.current_price.ils;
                        thiscoin.pic = result.image.small;
                        console.log(thiscoin);
                        console.log(storage_array);
                        storage_array[idforstring] = thiscoin;
                        var array2storage = JSON.stringify(storage_array);
                        localStorage.setItem("coinsdata", array2storage);
                    }
                });
            }
            // ===============================
            // get data from local storage
            // ===============================
            else {
                console.log(
                    "LOCAL" +
                    "the request::" +
                    timearray[idforstring] +
                    "timenow::" +
                    timenow
                );
                fromstorage = JSON.parse(localStorage.getItem("coinsdata"));
                console.log(fromstorage);
                console.log("this data" + fromstorage[idforstring].dollar);
                $("body").find(`${dataplace}`).html(`
                <div class="row">
                <div class="col-lg-6">
                <span>from local storage</span>            
                <span> <span >${
                    fromstorage[idforstring].dollar
                    }$</span></span><br> 
                <span> <span>${
                    fromstorage[idforstring].euro
                    }€</span></span><br> 
                <span> <span>₪${
                    fromstorage[idforstring].shekels
                    }</span></span><br>    
                </div>
                <div class="col-lg-6">            
                <img src="${
                    fromstorage[idforstring].pic
                    }" class="rounded" alt="Cinque Terre">           
                </div>
                </div>
                `);
            }
        }
    });
    // function to show mainpage
    $("#showmain").click(function () {
        $("#main").show();
        $("#report").hide();
        $("#about").hide();
        clearTimeout(intervel);
    });
    // function to show reports
    $("#showreports").click(function () {
        $("#main").hide();
        $("#report").show();
        $("#about").hide();


        // make the ajax call for the reports:


        var dataPoints1 = [];
        var dataPoints2 = [];
        var dataPoints3 = [];
        var dataPoints4 = [];
        var dataPoints5 = [];
        var options = {};


        // ajaxcall
        function ajaxcall() {


            $.ajax({
                url:
                    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" +
                    five_array +
                    "&tsyms=USD",
                success: function (result) {
                    coins_object = result;
                    // chart:
                    for (let index = 0; index < 5; index++) {
                        if (coins_object[five_array[index]] == undefined) {
                            validname_arr[index] = "no data";
                            options.data[index].name = "no data";
                            validvalue_arr[index] = 0;
                        }
                        else {
                            validname_arr[index] = five_array[index];
                            options.data[index].name = five_array[index];
                            validvalue_arr[index] = coins_object[five_array[index]].USD;
                        }
                    }
                    console.log(validname_arr);
                    console.log(validvalue_arr);
                    console.log(options.data);

                },
            });
        }
        intervel = setInterval(ajaxcall, 2000);




        // chart function
        options = {
            title: {
                text: "Electricity Generation in Turbine"
            },
            axisX: {
                title: "chart updates every 2 secs"
            },
            axisY: {
                suffix: "Wh",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                fontSize: 22,
                fontColor: "dimGrey",
                itemclick: toggleDataSeries
            },
            data: [{
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "###.00Wh",
                xValueFormatString: "hh:mm:ss TT",
                showInLegend: true,
                name: validname_arr[0],
                dataPoints: dataPoints1
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "###.00Wh",
                showInLegend: true,
                name: validname_arr[1],
                dataPoints: dataPoints2
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "###.00Wh",
                showInLegend: true,
                name: validname_arr[2],
                dataPoints: dataPoints3
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "###.00Wh",
                showInLegend: true,
                name: validname_arr[3],
                dataPoints: dataPoints4
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "###.00Wh",
                showInLegend: true,
                name: validname_arr[4],
                dataPoints: dataPoints5
            }
            ]
        };

        var chart = $("#chartContainer").CanvasJSChart(options);

        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }

        var updateInterval = 2000;
        // initial value
        var yValue1 = validvalue_arr[0];
        var yValue2 = validvalue_arr[1];
        var yValue3 = validvalue_arr[2];
        var yValue4 = validvalue_arr[3];
        var yValue5 = validvalue_arr[4];

        var time = new Date;
        // starting at 10.00 am
        time.getHours();
        time.getMinutes();
        time.getSeconds();
        time.getMilliseconds();

        function updateChart(count) {
            count = count || 1;
            for (var i = 0; i < count; i++) {
                time.setTime(time.getTime() + updateInterval);


                // adding random value and rounding it to two digits. 
                yValue1 = validvalue_arr[0];
                yValue2 = validvalue_arr[1];
                yValue3 = validvalue_arr[2];
                yValue4 = validvalue_arr[3];
                yValue5 = validvalue_arr[4];
                // pushing the new values
                dataPoints1.push({
                    x: time.getTime(),
                    y: yValue1
                });
                dataPoints2.push({
                    x: time.getTime(),
                    y: yValue2
                });
                dataPoints3.push({
                    x: time.getTime(),
                    y: yValue3
                });
                dataPoints4.push({
                    x: time.getTime(),
                    y: yValue4
                });
                dataPoints5.push({
                    x: time.getTime(),
                    y: yValue5
                });
            }

            // updating legend text with  updated with y Value 
            options.data[0].legendText = validname_arr[0] + yValue1 + "$";
            options.data[1].legendText = validname_arr[1] + yValue2 + "$";
            options.data[2].legendText = validname_arr[2] + yValue3 + "$";
            options.data[3].legendText = validname_arr[3] + yValue4 + "$";
            options.data[4].legendText = validname_arr[4] + yValue5 + "$";
            $("#chartContainer").CanvasJSChart().render();
        }
        // generates first set of dataPoints 
        updateChart(1);
        setInterval(function () { updateChart() }, updateInterval);



    });
    // function to show about
    $("#showabout").click(function () {
        $("#main").hide();
        $("#report").hide();
        $("#about").show();
        clearTimeout(intervel);
    });
    // function to send data to report:
    $(".row").on("change", ".form-check-input", function () {
        let thatcoin = $(this).attr("id");
        if ($(this).is(':checked')) {
            console.log("checked");
            if (five_array.length > 4) {
                $('#myModal').modal('show');
                console.log(five_array);
                $(this).attr('checked', false);
            }
            else {
                five_array.push(thatcoin);
                console.log(five_array);
                $(".modal-body").append(`<div>
                <input type="checkbox" class="form-check-input" id=${thatcoin} checked>
                <span class="modalspan">${thatcoin}</span><br></div>
                `);
            }
        }
        else {
            console.log("unchecked");
            for (var i = 0; i < five_array.length; i++) {
                if (five_array[i] === thatcoin) {
                    five_array.splice(i, 1);
                    console.log(five_array);
                    $(".modal-body").find("#" + `${thatcoin}`).parent().remove();
                    console.log($(".modal-body"));
                }
            }
        }
    });


    // modal check/uncheck
    $(".modal-body").on("change", ".form-check-input", function () {
        let modalcoin = $(this).attr("id");
        console.log(modalcoin);
        $("body").find("#" + modalcoin).attr('checked', false);
        console.log($("body").find("#" + modalcoin).is(':checked'));
        for (var i = 0; i < five_array.length; i++) {
            if (five_array[i] == modalcoin) {
                five_array.splice(i, 1);
                console.log(five_array);
                $(this).parent().hide();
            }
        }

    });

});
