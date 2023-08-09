<!DOCTYPE html>
<html>
<head>
    <title>Your reservation has expired!</title>
</head>
<body>
    <h1>Your reservation has expired!</h1>
    <h3>Hi {{ $username  }}</h3>
    <p>Your reservation from {{ $reservation->start_date }} to {{ $reservation->end_date }} at address {{ $address }} has expired. You can now post a review.</p>
</body>
</html>