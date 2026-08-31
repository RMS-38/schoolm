<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mark</title>
    <style>
        @page {
            margin: 1mm;
            margin-left: 10mm;
        }

        table {
            width: 70%;
            border: 1px solid;
            height: auto;

            background-color: #f5f5f5;
        }

        thead {
            background-color: gray;
            font-weight: bold;
            font-size: large;
        }

        th,
        td {
            padding: 8px;
            text-align: center;
        }

        table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        tbody {
            font-weight: 600;
        }

        .year-report {
            width: 70%;
            margin-top: 20px;
            padding: 10px;
            background-color: #f5f5f5;
            line-height: 12px;
        }

        .report-head {
            line-height: 11px;
        }

        .year {
            margin-top: 0px;
            font-weight: bold;
            font-size: 14px;
        }

        .year p {
            margin: 4px 0;
        }
    </style>
</head>

<body>
    <div class="report-head">
        <h3>Name: {{ $student->name }}</h3>
        <h3>Grade: {{ $student->grade->name }}</h3>
        <h3>Id: {{ $student->id }}</h3>
        <h3>Gender: {{ $student->gender }}</h3>
    </div>


    <table>
        <thead>
            <tr>
                <th style="text-align: left;">Subject</th>
                <th>Weight</th>
                <th>First term</th>
                <th>Second term</th>
                <th>Third term</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($grade->subjects as $subject)
            <tr style="border-bottom: 1px solid black;">
                <td style="text-align: left;">{{ $subject->name }}</td>
                <td>{{ $subject->coefficient }}</td>
                <td>

                    @php
                    $mark = collect($term_1['marks'])->firstWhere('subject_id', $subject->id);
                    @endphp
                    @if ($mark)
                    {{ $mark["value"] }}
                    @else
                    -
                    @endif
                </td>
                <td>

                    @php
                    $mark = collect($term_2['marks'])->firstWhere('subject_id', $subject->id);
                    @endphp
                    @if ($mark)
                    {{ $mark["value"] }}
                    @else
                    -
                    @endif
                </td>
                <td>

                    @php
                    $mark = collect($term_3['marks'])->firstWhere('subject_id', $subject->id);
                    @endphp
                    @if ($mark)
                    {{ $mark["value"] }}
                    @else
                    -
                    @endif
                </td>
            </tr>
            @endforeach
            <tr>
                <td colspan="2"
                    style="text-align: left;">
                    Total
                </td>
                <td>
                    {{ $term_1['total'] }}
                </td>
                <td>
                    {{ $term_2['total'] }}
                </td>
                <td>
                    {{ $term_3['total'] }}
                </td>
            </tr>
            <tr>
                <td colspan="2"
                    style="text-align: left;">
                    Average
                </td>
                <td>
                    {{ $term_1['average'] }}
                </td>
                <td>
                    {{ $term_2['average'] }}
                </td>
                <td>
                    {{ $term_3['average'] }}
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: left;">
                    Rank
                </td>
                <td>
                    {{ $ranks[0] }}
                </td>
                <td>
                    {{ $ranks[1] }}
                </td>
                <td>
                    {{ $ranks[2] }}
                </td>
            </tr>
        </tbody>
    </table>
    <div class="year-report">
        <h4>Year Report Card</h4>
        <div class="year">
            <p>Average: {{$year}}</p>
            <p>Rank: {{$ranks[3]}}</p>
        </div>
    </div>
</body>

</html>