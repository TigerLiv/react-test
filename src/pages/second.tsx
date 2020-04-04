import React, { Component } from 'react';
import axios from 'axios'
import ReactEcharts from 'echarts-for-react';
require('echarts/map/js/china.js');
require('echarts/map/js/world.js');
// type dataState={
//     dataGDP:object,
//     dataPI:object,
//     dataSI:object,
//     dataTI:object,
//     dataEstate:object,
//     dataFinancial:object
// }
interface myState {
    isDisplay: Boolean,
    dataGDP: any,
    dataPI: any,
    dataSI: any,
    dataTI: any,
    dataEstate: any,
    dataFinancial: any
}
interface myProps {

}
function dataFormatter(obj: any) {
    var pList = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'];
    var temp;
    for (var year = 2002; year <= 2011; year++) {
        var max = 0;
        var sum = 0;
        temp = obj[year];
        console.log(temp.length)
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
                name: pList[i],
                value: temp[i]
            };
        }
        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = sum;
    }
    return obj;
}

class Second extends Component<myProps, myState>{
    constructor(props: any) {
        super(props);
        this.state = {
            isDisplay: false,
            dataGDP: {},
            dataPI: {},
            dataSI: {},
            dataTI: {},
            dataEstate: {},
            dataFinancial: {}
        };
    }
    componentDidMount() {
        axios.get('/api/map_data').then(res => {
            this.setState({
                dataGDP: dataFormatter(res.data.dataGDP),
                dataPI: dataFormatter(res.data.dataPI),
                dataSI: dataFormatter(res.data.dataSI),
                dataTI: dataFormatter(res.data.dataTI),
                dataEstate: dataFormatter(res.data.dataEstate),
                dataFinancial: dataFormatter(res.data.dataFinancial)
            })
            // this.setState.dataGDP =res.dataGDP;
        })
    }
    getOption = () => {
        const option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                    // currentIndex: 2,
                    playInterval: 1000,
                    // controlStyle: {
                    //     position: 'left'
                    // },
                    data: [
                        '2002-01-01', '2003-01-01', '2004-01-01',
                        {
                            value: '2005-01-01',
                            tooltip: {
                                formatter: '{b} GDP达到一个高度'
                            },
                            symbol: 'diamond',
                            symbolSize: 16
                        },
                        '2006-01-01', '2007-01-01', '2008-01-01', '2009-01-01', '2010-01-01',
                        {
                            value: '2011-01-01',
                            tooltip: {
                                formatter: function (params: any) {
                                    return params.name + 'GDP达到又一个高度';
                                }
                            },
                            symbol: 'diamond',
                            symbolSize: 18
                        },
                    ],
                    label: {
                        formatter: function (s: any) {
                            return (new Date(s)).getFullYear();
                        }
                    }
                },
                title: {
                    subtext: '数据来自国家统计局'
                },
                tooltip: {
                },
                legend: {
                    left: 'right',
                    data: ['第一产业', '第二产业', '第三产业', 'GDP', '金融', '房地产'],
                    selected: {
                        'GDP': false, '金融': false, '房地产': false
                    }
                },
                calculable: true,
                grid: {
                    top: 80,
                    bottom: 100,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true,
                                formatter: function (params: any) {
                                    return params.value.replace('\n', '');
                                }
                            }
                        }
                    }
                },
                xAxis: [
                    {
                        'type': 'category',
                        'axisLabel': { 'interval': 0 },
                        'data': [
                            '北京', '\n天津', '河北', '\n山西', '内蒙古', '\n辽宁', '吉林', '\n黑龙江',
                            '上海', '\n江苏', '浙江', '\n安徽', '福建', '\n江西', '山东', '\n河南',
                            '湖北', '\n湖南', '广东', '\n广西', '海南', '\n重庆', '四川', '\n贵州',
                            '云南', '\n西藏', '陕西', '\n甘肃', '青海', '\n宁夏', '新疆'
                        ],
                        splitLine: { show: false }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'GDP（亿元）'
                    }
                ],
                series: [
                    { name: 'GDP', type: 'bar' },
                    { name: '金融', type: 'bar' },
                    { name: '房地产', type: 'bar' },
                    { name: '第一产业', type: 'bar' },
                    { name: '第二产业', type: 'bar' },
                    { name: '第三产业', type: 'bar' },
                    {
                        name: 'GDP占比',
                        type: 'pie',
                        center: ['75%', '35%'],
                        radius: '28%',
                        z: 100
                    }
                ]
            },
            options: [
                {
                    title: { text: '2002全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2002'] },
                        { data: this.state.dataFinancial['2002'] },
                        { data: this.state.dataEstate['2002'] },
                        { data: this.state.dataPI['2002'] },
                        { data: this.state.dataSI['2002'] },
                        { data: this.state.dataTI['2002'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2002sum'] },
                                { name: '第二产业', value: this.state.dataSI['2002sum'] },
                                { name: '第三产业', value: this.state.dataTI['2002sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2003全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2003'] },
                        { data: this.state.dataFinancial['2003'] },
                        { data: this.state.dataEstate['2003'] },
                        { data: this.state.dataPI['2003'] },
                        { data: this.state.dataSI['2003'] },
                        { data: this.state.dataTI['2003'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2003sum'] },
                                { name: '第二产业', value: this.state.dataSI['2003sum'] },
                                { name: '第三产业', value: this.state.dataTI['2003sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2004全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2004'] },
                        { data: this.state.dataFinancial['2004'] },
                        { data: this.state.dataEstate['2004'] },
                        { data: this.state.dataPI['2004'] },
                        { data: this.state.dataSI['2004'] },
                        { data: this.state.dataTI['2004'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2004sum'] },
                                { name: '第二产业', value: this.state.dataSI['2004sum'] },
                                { name: '第三产业', value: this.state.dataTI['2004sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2005全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2005'] },
                        { data: this.state.dataFinancial['2005'] },
                        { data: this.state.dataEstate['2005'] },
                        { data: this.state.dataPI['2005'] },
                        { data: this.state.dataSI['2005'] },
                        { data: this.state.dataTI['2005'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2005sum'] },
                                { name: '第二产业', value: this.state.dataSI['2005sum'] },
                                { name: '第三产业', value: this.state.dataTI['2005sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2006全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2006'] },
                        { data: this.state.dataFinancial['2006'] },
                        { data: this.state.dataEstate['2006'] },
                        { data: this.state.dataPI['2006'] },
                        { data: this.state.dataSI['2006'] },
                        { data: this.state.dataTI['2006'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2006sum'] },
                                { name: '第二产业', value: this.state.dataSI['2006sum'] },
                                { name: '第三产业', value: this.state.dataTI['2006sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2007全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2007'] },
                        { data: this.state.dataFinancial['2007'] },
                        { data: this.state.dataEstate['2007'] },
                        { data: this.state.dataPI['2007'] },
                        { data: this.state.dataSI['2007'] },
                        { data: this.state.dataTI['2007'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2007sum'] },
                                { name: '第二产业', value: this.state.dataSI['2007sum'] },
                                { name: '第三产业', value: this.state.dataTI['2007sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2008全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2008'] },
                        { data: this.state.dataFinancial['2008'] },
                        { data: this.state.dataEstate['2008'] },
                        { data: this.state.dataPI['2008'] },
                        { data: this.state.dataSI['2008'] },
                        { data: this.state.dataTI['2008'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2008sum'] },
                                { name: '第二产业', value: this.state.dataSI['2008sum'] },
                                { name: '第三产业', value: this.state.dataTI['2008sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2009全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2009'] },
                        { data: this.state.dataFinancial['2009'] },
                        { data: this.state.dataEstate['2009'] },
                        { data: this.state.dataPI['2009'] },
                        { data: this.state.dataSI['2009'] },
                        { data: this.state.dataTI['2009'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2009sum'] },
                                { name: '第二产业', value: this.state.dataSI['2009sum'] },
                                { name: '第三产业', value: this.state.dataTI['2009sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2010全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2010'] },
                        { data: this.state.dataFinancial['2010'] },
                        { data: this.state.dataEstate['2010'] },
                        { data: this.state.dataPI['2010'] },
                        { data: this.state.dataSI['2010'] },
                        { data: this.state.dataTI['2010'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2010sum'] },
                                { name: '第二产业', value: this.state.dataSI['2010sum'] },
                                { name: '第三产业', value: this.state.dataTI['2010sum'] }
                            ]
                        }
                    ]
                },
                {
                    title: { text: '2011全国宏观经济指标' },
                    series: [
                        { data: this.state.dataGDP['2011'] },
                        { data: this.state.dataFinancial['2011'] },
                        { data: this.state.dataEstate['2011'] },
                        { data: this.state.dataPI['2011'] },
                        { data: this.state.dataSI['2011'] },
                        { data: this.state.dataTI['2011'] },
                        {
                            data: [
                                { name: '第一产业', value: this.state.dataPI['2011sum'] },
                                { name: '第二产业', value: this.state.dataSI['2011sum'] },
                                { name: '第三产业', value: this.state.dataTI['2011sum'] }
                            ]
                        }
                    ]
                }
            ]
        };
        return option;
    }

    render() {
        return <ReactEcharts option={this.getOption()} style={{ height: '100%', width: '100%' }}></ReactEcharts>
    }
}
export default Second;