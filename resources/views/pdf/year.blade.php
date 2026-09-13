<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Year report</title>
    <style>
        h1 {
            text-decoration: underline;
            text-align: center;
        }
    </style>
</head>

<body>
    <h1>Reports year</h1>
    <h2>Grade: {{$grade->name}}</h2>
    @php
    $perPage = 25;
    @endphp
    @foreach ($reports->chunk($perPage) as $chunk)
    <table width="100%" border="1" cellspacing="0" cellpadding="6">
        <thead>
            <tr>
                <th>Id</th>
                <th>Subjects</th>
                <th>First term</th>
                <th>Second term</th>
                <th>Third term</th>
                <th>Year</th>
                <th>Rank</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($chunk as $student)
            <tr>
                <td>
                    {{ $student['id'] }}
                </td>
                <td>
                    {{ $student['name'] }}
                </td>
                <td>
                    {{ $student['terms'][0] ?? '-' }}
                </td>
                <td>
                    {{ $student['terms'][1] ?? '-' }}
                </td>
                <td>
                    {{ $student['terms'][2] ?? '-' }}
                </td>
                <td>
                    {{ $student['terms'][3] ?? '-' }}
                </td>
                <td>
                    {{ $student['rank'] }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @if(!$loop->last)
    <div style="page-break-after: always;"></div>
    @endif
    @endforeach
</body>


</html>