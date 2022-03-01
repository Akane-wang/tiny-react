import CarouselDemo from '@/basic/ReoButton/demo/carouselButton';
import ReoTable, { IProps } from '@/basic/ReoTable';
import classnames from 'classnames';
import React from 'react';
import style from './demo.module.less';

class App extends React.Component {

    public state: IProps = {
        columns: [
            {
                value: 'rowTitle',
                title: '',

            },
            {
                value: 'argus-2e',
                title: 'Argus 2E',
            },
            {
                value: 'argus-3-pro',
                title: 'Argus 3 Pro',
            },
            {

                value: 'argus-eco',
                title: 'Argus Eco',

            },
            {
                value: 'argus-pt',
                title: 'Argus PT',
            },
            {

                value: 'argus-pt-pro',
                title: 'Argus PT Pro',
            },
            {

                value: 'reolink-go_plus',
                title: 'Reolink Go/Reolink Go Plus',
            },
            {

                value: 'reolink-go-pt_plus',
                title: 'Reolink Go PT/Reolink Glus',

            },
            {
                value: 'reolink-duo',
                title: 'Reolink Duo',
            },
            {
                value: 'reolink-duo-4g',
                title: 'Reolink Duo 4G',
            },

        ], // 显示数据： 数据显示类型
        // 对齐方式： 居中
        dataSource: [
            {
                rowTitle: 'For Continuous Recording (Approximately)',
                'argus-2e': '15h',
                'argus-3-pro': '13h',
                'argus-eco': '15h',
                'argus-pt': '15h',
                'argus-pt-pro': '12h',
                'reolink-go_plus': '12h',
                'reolink-go-pt_plus': '10h',
                'reolink-duo': '12h',
                'reolink-duo-4g': '10h'
            },
            {
                rowTitle: 'In Standby Mode (Approximately)',
                'argus-2e': '6 Months',
                'argus-3-pro': '6 Months',
                'argus-eco': '6 Months',
                'argus-pt': '6 Months',
                'argus-pt-pro': '6 Months',
                'reolink-go_plus': '1.5 Months',
                'reolink-go-pt_plus': '1 Month',
                'reolink-duo': '12 Months',
                'reolink-duo-4g': '3 Months'
            },
            {
                rowTitle: 'For Normal Use (Approximately)',
                'argus-2e': '3 Months',
                'argus-3-pro': '3 Months',
                'argus-eco': '3 Months',
                'argus-pt': '3 Months',
                'argus-pt-pro': '3 Months',
                'reolink-go_plus': '1 Month',
                'reolink-go-pt_plus': '20 Days',
                'reolink-duo': '3 Months',
                'reolink-duo-4g': '15 Months'
            },
        ]
    };
    public render(): React.ReactElement {

        return (
            <div className={ 'app-wrap' }>
                <CarouselDemo />
                <ReoTable
                    columns={ this.state.columns }
                    dataSource={ this.state.dataSource }
                    tableColumnClassName={ style['table-column'] }
                    tableDataClassName={ style['table-data-source'] }
                    useCarouselButton={ false }
                    childrenContainerClassName={ classnames(
                        style['children-container-className']
                    ) }
                    className={ style.reo_table }
                >

                </ReoTable>
            </div>
        );
    }
}

export default App;
