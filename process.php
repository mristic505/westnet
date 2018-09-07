<?php
// process.php
header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json");

// Import PHPMailer classes into the global namespace =================
require 'PHPMailer-master/PHPMailerAutoload.php';
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
// End Importing PHPMailer classes into the global namespace ==========

// require_once('meekrodb.2.3.class.php');
// DB::$user = 'matejar';
// DB::$password = 'BCconnect1500$#';
// DB::$dbName = 'temp2';
// DB::$user = 'root';
// DB::$password = 'root';
// DB::$dbName = 'racetovegas';

date_default_timezone_set("America/New_York");
$current_date = date('Ymd');
$current_time = time();


$errors         = array();      // array to hold validation errors
$data           = array();      // array to pass back data


$first_name         = $_POST['first_name'];
$last_name          = $_POST['last_name'];
$email              = $_POST['email'];
$company            = $_POST['company'];
$address            = $_POST['address'];
$zip                = $_POST['zip'];
$recaptcha          = $_POST['recaptcha'];
$captcha_secret_key = '6LcP2FQUAAAAALsa2qx_YAKAimbqykZm6rw7XNy3';

if (empty($company)) {
    $company = 'Not submitted';
}
if (empty($address)) {
    $address = 'Not submitted';
}
if (empty($zip)) {
    $zip = 'Not submitted';
}

// Form validation ==============
// Empty value check
if (empty($first_name)) {
    $errors['first_name'] = 'Please enter your first name';
}
if (empty($first_name)) {
    $errors['last_name'] = 'Please enter your last name';
}
if (empty($email)) {
    $errors['email'] = 'Please enter your email';
}
if (empty($recaptcha)) {
    $errors['recaptcha'] = 'Please check captcha';
}


// return a response ===========================================================

// if there are any errors in our errors array, return a success boolean or false
if ( ! empty($errors)) {

    // if there are items in our errors array, return those errors
    $data['success'] = false;
    $data['errors']  = $errors;

} else {

    // CURL TO VALIDATE CAPTCHA
    function file_get_contents_curl($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }

    $verifyResponse = file_get_contents_curl('https://www.google.com/recaptcha/api/siteverify?secret=' . $captcha_secret_key . '&response=' . $recaptcha);
    $responseData   = json_decode($verifyResponse);
    
    // IF reCAPTCHA RETURNS POSITIVE RESPONSE
    if ($responseData->success) {

        $data['success'] = true;
        $data['message'] = 'Success';

        // Email fandango code ==================
        include 'email-content.php';
        $mail->isSMTP();
        $mail->SMTPAuth = true;

        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465;
        $mail->SMTPSecure = 'ssl';
        $mail->Username = 'westnet.internet.cg2@gmail.com';
        $mail->Password = 'mimicapas1234';

        $mail->SetFrom = 'westnet.internet.cg2@gmail.com';
        $mail->FromName = 'Westnet Internet';
        $mail->addAddress('mateja.ristic@gmail.com');
         
        $mail->isHTML(false);
        
        $mail->Subject = 'Offer request from www.westnet-internet.com ';
        $mail->Body = 'First Name: '.$first_name. PHP_EOL .'Last Name: '.$last_name. PHP_EOL .'Email: '.$email. PHP_EOL .'Company: '.$company. PHP_EOL .'Address: '.$address. PHP_EOL .'Zip: '.$zip;
        if(!$mail->send()) {
            $data['email'] = 'Mailer Error: ' . $mail->ErrorInfo;
            $error=true;
        } else {
            $data['email'] = 'Message has been sent.';
        }

    } else {
        $data['message'] = 'robot_verification_failed';
    }

    
    
}
echo json_encode($data);

// return all our data to an AJAX call
