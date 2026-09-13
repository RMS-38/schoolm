<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Report cards</title>
    <style>
        h1 {
            text-align: center;
            text-decoration: underline;
        }
    </style>
</head>

<body>
    @php

    $termLabel = "First";
    $perPage = 25;

    if($term === 1){
    $termLabel = "First";
    }elseif($term === 2){
    $termLabel = "Second";
    }else{
    $termLabel = "Third";
    }
    @endphp
    <h1>Reports</h1>
    <h3>Term: {{$termLabel}}</h3>
    <h3>Grade: {{$grade->name}}</h3>
    @foreach ($reports->chunk($perPage) as $chunk)
    <table width="100%" border="1" cellspacing="0" cellpadding="5">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                @foreach ($subjects as $subject)
                <th>
                    {{ $subject['name'] }}
                </th>
                @endforeach
                <th>Total</th>
                <th>Average</th>
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
                @foreach ($subjects as $subject)
                <td>
                    @php
                    $mark = collect($student['marks'])->firstWhere('subject_id', $subject['id']);
                    @endphp
                    {{ $mark['value']??'-' }}
                </td>
                @endforeach
                <td>
                    {{ $student['total']??'-' }}
                </td>
                <td>
                    {{ $student['average']??'-' }}
                </td>
                <td>
                    {{ $student['rank']??'-' }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @if (!$loop->last)
    <div style="page-break-after: always;"></div>
    @endif
    @endforeach
</body>

</html>