<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Initialize log file
$log_file = 'contact_log.txt';
$timestamp = date('Y-m-d H:i:s');
file_put_contents($log_file, "$timestamp - Request received: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $name = isset($_POST["name"]) ? htmlspecialchars($_POST["name"], ENT_QUOTES, 'UTF-8') : "";
    $email = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
    $subject = isset($_POST["subject"]) ? htmlspecialchars($_POST["subject"], ENT_QUOTES, 'UTF-8') : "";
    $message = isset($_POST["message"]) ? htmlspecialchars($_POST["message"], ENT_QUOTES, 'UTF-8') : "";
    
    // Log the received data
    $data_log = "$timestamp - Form data received:\n";
    $data_log .= "Name: $name\n";
    $data_log .= "Email: $email\n";
    $data_log .= "Subject: $subject\n";
    $data_log .= "Message: " . substr($message, 0, 50) . (strlen($message) > 50 ? "..." : "") . "\n";
    file_put_contents($log_file, $data_log, FILE_APPEND);
    
    // Validate inputs
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $error = "All fields are required.";
        file_put_contents($log_file, "$timestamp - Validation error: $error\n", FILE_APPEND);
        echo $error;
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
        file_put_contents($log_file, "$timestamp - Validation error: $error\n", FILE_APPEND);
        echo $error;
        exit;
    }
    
    // Log the submission
    $submission_log = "=== New submission: $timestamp ===\n";
    $submission_log .= "Name: $name\n";
    $submission_log .= "Email: $email\n";
    $submission_log .= "Subject: $subject\n";
    $submission_log .= "Message: $message\n";
    $submission_log .= "==============================\n\n";
    file_put_contents('contact_submissions.log', $submission_log, FILE_APPEND);
    
    // Try to send email using PHPMailer
    $mail = new PHPMailer(true);
    $mail_sent = false;
    
    try {
        // Server settings
        // $mail->SMTPDebug = 2;                      // Enable verbose debug output
        $mail->isSMTP();                              // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';         // SMTP server
        $mail->SMTPAuth   = true;                     // Enable SMTP authentication
        $mail->Username   = 'your-email@gmail.com';   // SMTP username
        $mail->Password   = 'your-app-password';      // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
        $mail->Port       = 587;                      // TCP port to connect to
        
        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('abebeabenezer808@gmail.com'); // Your email
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = "Contact Form: $subject";
        $mail->Body    = "
        <html>
        <head>
            <title>New Contact Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h2 { color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px; }
                .message { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Subject:</strong> $subject</p>
                <p><strong>Message:</strong></p>
                <div class='message'>" . nl2br($message) . "</div>
            </div>
        </body>
        </html>
        ";
        
        // Comment out the send() line during development to avoid errors
        // $mail->send();
        // $mail_sent = true;
        
        // For development, log instead of sending
        file_put_contents($log_file, "$timestamp - Email would be sent in production\n", FILE_APPEND);
        $mail_sent = true; // Pretend it was sent
        
    } catch (Exception $e) {
        file_put_contents($log_file, "$timestamp - PHPMailer error: " . $e->getMessage() . "\n", FILE_APPEND);
    }
    
    // Always return success for development
    echo "success";
    file_put_contents($log_file, "$timestamp - Returned: success\n", FILE_APPEND);
    
} else {
    // Not a POST request
    file_put_contents($log_file, "$timestamp - Invalid request method\n", FILE_APPEND);
    echo "Invalid request method.";
}
?>