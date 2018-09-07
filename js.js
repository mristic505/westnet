jQuery(document).ready(function($){

	$('#cg2_lp_content').html('<div class="cg2_banner"> <div style="display: table-cell; vertical-align: middle;"> <div class="cg2_banner_text">Stop Paying Too Much for High-Speed Internet.<br>Start Getting More, with AT&T Business Fiber from WestNet.</div></div></div><div class="cg2_intro"> <div class="cg2_right"> <img class="cg2_so" src="special-offer.png"> </div><div class="cg2_left"> <h2 class="cg2_wsite-content-title">Did you know that right now, you can get super-fast internet connectivity, powered by AT&T, at competitive rates from WestNet?</h2> <p class="paragraph">Save time and money, with the reliability and security your company needs, across multiple departments or multiple locations. Wheth er you’re streaming video, sending data or connecting to the cloud, WestNet’s super-fast fiber optic internet delivers.</p></div></div><div class="cg2_table_holder" style="margin:0 auto;max-width: 654px;width: 95%;"> <table class="cg2_table"> <tr> <td style="padding-right:40px;"> <img src="tb-1.png"> </td><td style="padding:20px 0;"> <h2 class="cg2_wsite-content-title">Get more speed.</h2> <p class="paragraph">Upload and download speeds up to 1 Gbps.</p></td></tr><tr> <td style="padding-right:40px;"> <img src="tb-2.png"> </td><td style="padding:20px 0;"> <h2 class="cg2_wsite-content-title">Get more productivity.</h2> <p class="paragraph">With 99% network reliability, your team can connect to each other and to vendors, partners, and customers with confidence.</p></td></tr><tr> <td style="padding-right:40px;"> <img src="tb-3.png"> </td><td style="padding:20px 0;"> <h2 class="cg2_wsite-content-title">Get more support.</h2> <p class="paragraph">Our solutions are backed by WestNet’s fully staffed Network Operating Center, with proactive system monitoring and maintenance, 24/7/365.</p></td></tr><tr> <td style="padding-right:40px;"> <img src="tb-4.png"> </td><td style="padding:20px 0;"> <h2 class="cg2_wsite-content-title">Get more savings.</h2> <p class="paragraph">WestNet’s cost-efficient pricing boosts your bottom line.</p></td></tr></table> </div><div class="cg2_form_holder"> <div class="cg2_frm_desc"> Get our Special Offer: No-charge pre-qualification and one free month of service.*<br><span>Call us at <b>833-WESTNET (937-8638)</b> or fill out our form and we’ll be in touch.</span> </div><form action="process.php" method="POST"> <div class="cg2_frm_left"> <div class="cg2_frm_filed" id="first_name_group"> <input placeholder="FIRST NAME" type="text" name="first_name" id="first_name"> </div><div class="cg2_frm_filed" id="last_name_group"> <input placeholder="LAST NAME" type="text" name="last_name" id="last_name"> </div><div class="cg2_frm_filed" id="company_group"> <input placeholder="COMPANY" type="text" name="company" id="company"> </div><div class="cg2_frm_filed" id="address_group"> <input placeholder="ADDRESS" type="text" name="address" id="address"> </div><div class="cg2_frm_filed" id="zip_group"> <input placeholder="ZIP" type="text" name="zip" id="zip"> </div><div class="cg2_frm_filed" id="email_group"> <input placeholder="EMAIL" type="text" name="email" id="email"> </div></div><div class="cg2_frm_submit cg2_frm_right"> <div class="cg2_frm_filed" id="recaptcha_group"> <div class="g-recaptcha" data-sitekey="6LcP2FQUAAAAAKR6_Fl0U6uw640gCz_0-fHNX-Sk"></div></div><div class="cg2_label">*Offer good with 24-month contract with WestNet.</div><input type="submit" name="submit" id="submit" value="SUBMIT" > </div></form> </div><div class="cg2_att_logos"> <img class="cg2_l_left" src="att-logos.png"> <img class="cg2_l_right" src="att-logo.png"> </div>');

	// process the form
	$('form').submit(function(event) {

    	$('.cg2_frm_filed').removeClass('has-error'); // remove the error class
    	$('.help-block').remove(); // remove the error text

        // get the form data        
        var form_data = {
            first_name : $('#first_name').val(),
            last_name : $('#last_name').val(),
            company : $('#company').val(),
            address : $('#address').val(),
            zip : $('#zip').val(),
            email : $('#email').val(),
            recaptcha: grecaptcha.getResponse()
        };        

        // process the form
        $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: 'process.php', // the url where we want to POST
                // url: './racetovegas-rackspace-files/process.php', // the url where we want to POST
                data: form_data, // our data object
                dataType: 'json', // what type of data do we expect back from the server
                encode: true
            })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);

                if (!data.success) {
                    // handle errors for name ---------------                   
                    for (var key in data.errors) {
					    if (data.errors.hasOwnProperty(key)) {
					        $('#'+key+"_group").addClass('has-error'); // add the error class to show red input
                        	$('#'+key+"_group").append('<div class="help-block">' + data.errors[key] + '</div>');
					    }
					}
                } else {
                	
					$('form').hide();					
					$('.cg2_form_holder').append($('<h3 style="display: block;text-align: center;color: #fa8c39;">Thank you. Your request has been successfully submitted.</h3>').hide().fadeIn(700));

                    
                }            
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });
});