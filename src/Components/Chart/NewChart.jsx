import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTranslation } from 'react-i18next';


ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

export default function NewChart({ totalOrder = 0, pendingOrder = 0, cancelOrder = 0 }) {
    const { t } = useTranslation();

    const data = {
        labels: [t("Total Sales") + ' (' + totalOrder + '%)', t("Pending Orders") + ' (' + pendingOrder + '%)', t("Canceled Orders") + ' (' + cancelOrder + '%)'],
        datasets: [
            {
                label: '123',
                data: [totalOrder, pendingOrder, cancelOrder],
                backgroundColor: [
                    '#FB607F',
                    '#FFD66B',
                    '#FF8F6B',
                ],
                hoverOffset: 15,
            },
        ]
    };

    const options = {
        maintainAspectRatio: false,
        layout: {
            padding: 15,
        },
        tooltips: {
            enabled: false
        },
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    if (value > 0)
                        return value + '%';
                    else
                        return "";
                },
                display: true,
                color: "white",
                align: "end",
                padding: {
                    right: 2
                },
                font: {
                    size: 18
                },
                textShadowBlur: 1,
                textShadowColor: "black",
                labels: {

                    padding: { top: 10 },
                    title: {
                        font: {
                            weight: "bold"
                        }
                    },
                    value: {
                        color: "white"
                    }
                },
            },
            legend: {
                position: "bottom",
                align: 'start',
                labels: {
                    padding: 15 //default is 10
                },
            }
        }
    };

    return (
        <Pie data={data} options={options} />
    )
}
