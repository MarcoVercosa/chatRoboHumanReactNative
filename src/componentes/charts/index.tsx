import React, { memo, } from 'react'
import { Text, View, } from "react-native";

import {
    BarChart,
} from "react-native-chart-kit";

export interface ICharts {
    data: Array<{
        currentDate: string;
        reservatorios: Array<{
            Nome: String;
            VolumePorcentagemAR: String;
            VolumeVariacaoStr: String;
        }>
    }>
}


function Charts({ data }: ICharts): JSX.Element {

    const chartConfig = {
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.3,
        useShadowColorFromDataset: false, // optional
        style: {
            borderRadius: 10,
            backgroundColor: "#0000CD"
        },
    };

    const dataVolume = {
        labels:
            [String(data[0].reservatorios[0].Nome), String(data[0].reservatorios[1].Nome), String(data[0].reservatorios[2].Nome),
            String(data[0].reservatorios[3].Nome), String(data[0].reservatorios[4].Nome), String(data[0].reservatorios[5].Nome),
            String(data[0].reservatorios[6].Nome)
            ],
        datasets:
            [
                {
                    data: [Number(data[0].reservatorios[0].VolumePorcentagemAR.replace(",", ".")), Number(data[0].reservatorios[1].VolumePorcentagemAR.replace(",", ".")),
                    Number(data[0].reservatorios[2].VolumePorcentagemAR.replace(",", ".")), Number(data[0].reservatorios[3].VolumePorcentagemAR.replace(",", ".")),
                    Number(data[0].reservatorios[4].VolumePorcentagemAR.replace(",", ".")), Number(data[0].reservatorios[5].VolumePorcentagemAR.replace(",", ".")),
                    Number(data[0].reservatorios[6].VolumePorcentagemAR.replace(",", "."))
                    ]
                }
            ]
    };
    const dataVariacao = {
        labels:
            [String(data[0].reservatorios[0].Nome), String(data[0].reservatorios[1].Nome), String(data[0].reservatorios[2].Nome),
            String(data[0].reservatorios[3].Nome), String(data[0].reservatorios[4].Nome), String(data[0].reservatorios[5].Nome),
            String(data[0].reservatorios[6].Nome)
            ],
        datasets:
            [
                {
                    data: [Number(data[0].reservatorios[0].VolumeVariacaoStr.replace(",", ".")), Number(data[0].reservatorios[1].VolumeVariacaoStr.replace(",", ".")),
                    Number(data[0].reservatorios[2].VolumeVariacaoStr.replace(",", ".")), Number(data[0].reservatorios[3].VolumeVariacaoStr.replace(",", ".")),
                    Number(data[0].reservatorios[4].VolumeVariacaoStr.replace(",", ".")), Number(data[0].reservatorios[5].VolumeVariacaoStr.replace(",", ".")),
                    Number(data[0].reservatorios[6].VolumeVariacaoStr.replace(",", "."))
                    ]
                }
            ]
    };

    return (
        <>
            <View>
                <Text
                    style={{ marginBottom: 15, marginTop: 35, fontWeight: "bold", fontSize: 20 }}
                >Níveis dos Sistemas de Abastecimento de São Paulo (%) - {data[0].currentDate}</Text>
                <BarChart
                    data={dataVolume}
                    width={295}
                    height={450}
                    yAxisSuffix=""
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={90}
                    showValuesOnTopOfBars={true}
                    style={chartConfig.style}

                />
                <Text
                    style={{ marginBottom: 15, marginTop: 35, fontWeight: "bold", fontSize: 20 }}
                >Variações dia (%)  - {data[0].currentDate}- {data[0].currentDate}</Text>
                <BarChart
                    data={dataVariacao}
                    width={295}
                    height={450}
                    yAxisSuffix=""
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={90}
                    showValuesOnTopOfBars={true}
                    style={chartConfig.style}
                />
            </View>
        </>
    )
}

export default memo(Charts)