/* eslint-disable max-len */
import CarouselDemo, { IProps } from '@/basic/ReoButton/demo/carouselButton';
// import ReoTable, { IProps } from '@/basic/ReoTable';
// import classnames from 'classnames';
import React from 'react';
// import style from './demo.module.less';

class App extends React.Component {

    public state: IProps = {
        title: 'From Our Customers',
        userCommentList: [
            {
                star: 5,
                title: '1-----ALL NEW ARGUS 3 PRO',
                comment: 'Very very nice camera. Looks and feels like a $500 camera. This has lots of upgrades from the Argus 3. Dual wifi 2.4GHz and 5GHz, and it works great. The PIR is all so good, I had no false triggers.<br>It had night color video and all so now 2K up from 1080p, and you can see the difference, way better...and then there is the light, wow so bright, you can leave it on/off up to you. It\'s all done by the app, same as the siren. Even better, you can record your own voice message to play when motion is detected...And the battery, well I have had it 4 weeks and it\'s on 100% still, but I am in Australia, so I unplugged it from my solar panel and use it a lot, and I had it on 2K mode and only used 18%...Overall it\'s a fanatic camera. For the price it\'s the best in its field.',
                user: 'From Clive, a user of Argus 3 Pro',
                learnMore: 'Read more',
                href: '/product/argus-3-pro'
            },
            {
                star: 5,
                title: '2-----Impressive Little Cam',
                comment: 'I have the camera and solar panel mounted on an aluminum plate backed with magnets so I can move it around out our jobsite and follow the construction phases. I\'ve had it indoors for the past month without access to the sun and have found the battery to last 12 days before needing a charge. Charging takes 4-5 hours with a rapid charger which is pretty reasonable but when possible, I still recommend the solar panel since it keeps the cams fully charged and allows for nearly constant streaming., I\'m currently on a prepaid T-Mobile package that expired a few days ago so I am about to switch it to the EIOTCLUB SIM card that Reolink recommended. I will follow up on how that procedure works out but I\'m sure it was just as easy as the T-mobile card. Basically I inserted the pre-activated card and powered it on and it worked.',
                user: 'From Coulter, a user of Reolink Go Plus',
                learnMore: 'Read more',
                href: '/product/reolink-go-plus'
            },
            {
                star: 5,
                title: 'Very Good Camera for Battery Operation',
                comment: '3-----I have the camera, have been using it for more than 4 months and am satisfied. Price-performance ratio is more than ok. At the beginning there were a few connection problems with the WiFi, but with the help of the support and these could be remedied., Since I don\'t have a power connection at the installation site, charging with a solar panel was very important to me. This works very well after I have hung the panel facing southwest. For this, however, I would have to buy an extension cable, as the standard length was not sufficient for my configuration.',
                user: 'By Penelope, a user of Argus 2',
                learnMore: 'Read more',
                href: '/product/argus-2'
            },
            {
                star: 5,
                title: 'ALL NEW ARGUS 3 PRO',
                comment: 'Very very nice camera. Looks and feels like a $500 camera. This has lots of upgrades from the Argus 3. Dual wifi 2.4GHz and 5GHz, and it works great. The PIR is all so good, I had no false triggers.<br>It had night color video and all so now 2K up from 1080p, and you can see the difference, way better...and then there is the light, wow so bright, you can leave it on/off up to you. It\'s all done by the app, same as the siren. Even better, you can record your own voice message to play when motion is detected...And the battery, well I have had it 4 weeks and it\'s on 100% still, but I am in Australia, so I unplugged it from my solar panel and use it a lot, and I had it on 2K mode and only used 18%...Overall it\'s a fanatic camera. For the price it\'s the best in its field.',
                user: 'From Clive, a user of Argus 3 Pro',
                learnMore: 'Read more',
                href: '/product/argus-3-pro'
            },
            {
                star: 5,
                title: 'Impressive Little Cam',
                comment: 'I have the camera and solar panel mounted on an aluminum plate backed with magnets so I can move it around out our jobsite and follow the construction phases. I\'ve had it indoors for the past month without access to the sun and have found the battery to last 12 days before needing a charge. Charging takes 4-5 hours with a rapid charger which is pretty reasonable but when possible, I still recommend the solar panel since it keeps the cams fully charged and allows for nearly constant streaming., I\'m currently on a prepaid T-Mobile package that expired a few days ago so I am about to switch it to the EIOTCLUB SIM card that Reolink recommended. I will follow up on how that procedure works out but I\'m sure it was just as easy as the T-mobile card. Basically I inserted the pre-activated card and powered it on and it worked.',
                user: 'From Coulter, a user of Reolink Go Plus',
                learnMore: 'Read more',
                href: '/product/reolink-go-plus'
            },
            {
                star: 5,
                title: 'Very Good Camera for Battery Operation',
                comment: 'I have the camera, have been using it for more than 4 months and am satisfied. Price-performance ratio is more than ok. At the beginning there were a few connection problems with the WiFi, but with the help of the support and these could be remedied., Since I don\'t have a power connection at the installation site, charging with a solar panel was very important to me. This works very well after I have hung the panel facing southwest. For this, however, I would have to buy an extension cable, as the standard length was not sufficient for my configuration.',
                user: 'By Penelope, a user of Argus 2',
                learnMore: 'Read more',
                href: '/product/argus-2'
            },
            {
                star: 5,
                title: 'ALL NEW ARGUS 3 PRO',
                comment: 'Very very nice camera. Looks and feels like a $500 camera. This has lots of upgrades from the Argus 3. Dual wifi 2.4GHz and 5GHz, and it works great. The PIR is all so good, I had no false triggers.<br>It had night color video and all so now 2K up from 1080p, and you can see the difference, way better...and then there is the light, wow so bright, you can leave it on/off up to you. It\'s all done by the app, same as the siren. Even better, you can record your own voice message to play when motion is detected...And the battery, well I have had it 4 weeks and it\'s on 100% still, but I am in Australia, so I unplugged it from my solar panel and use it a lot, and I had it on 2K mode and only used 18%...Overall it\'s a fanatic camera. For the price it\'s the best in its field.',
                user: 'From Clive, a user of Argus 3 Pro',
                learnMore: 'Read more',
                href: '/product/argus-3-pro'
            },
            {
                star: 5,
                title: 'Impressive Little Cam',
                comment: 'I have the camera and solar panel mounted on an aluminum plate backed with magnets so I can move it around out our jobsite and follow the construction phases. I\'ve had it indoors for the past month without access to the sun and have found the battery to last 12 days before needing a charge. Charging takes 4-5 hours with a rapid charger which is pretty reasonable but when possible, I still recommend the solar panel since it keeps the cams fully charged and allows for nearly constant streaming., I\'m currently on a prepaid T-Mobile package that expired a few days ago so I am about to switch it to the EIOTCLUB SIM card that Reolink recommended. I will follow up on how that procedure works out but I\'m sure it was just as easy as the T-mobile card. Basically I inserted the pre-activated card and powered it on and it worked.  I\'ve had it indoors for the past month without access to the sun and have found the battery to last 12 days before needing a charge. Charging takes 4-5 hours with a rapid charger which is pretty reasonable but when possible, I still recommend the solar panel since it keeps the cams fully charged  I\'ve had it indoors for the past month without access to the sun and have found the battery to last 12 days before needing a charge. Charging takes 4-5 hours with a rapid charger which is pretty reasonable but when possible, I still recommend the solar panel since it keeps the cams fully charged',
                user: 'From Coulter, a user of Reolink Go Plus',
                learnMore: 'Read more',
                href: '/product/reolink-go-plus'
            },
            {
                star: 5,
                title: 'Very Good Camera for Battery Operation',
                comment: 'I have the camera, have been using it for more than 4 months and am satisfied. Price-performance ratio is more than ok. At the beginning there were a few connection problems with the WiFi, but with the help of the support and these could be remedied., Since I don\'t have a power connection at the installation site, charging with a solar panel was very important to me. This works very well after I have hung the panel facing southwest. For this, however, I would have to buy an extension cable, as the standard length was not sufficient for my configuration.',
                user: 'By Penelope, a user of Argus 2',
                learnMore: 'Read more',
                href: '/product/argus-2'
            }
        ],
        // columns: [
        //     {
        //         value: 'rowTitle',
        //         title: '',

        //     },
        //     {
        //         value: 'argus-2e',
        //         title: 'Argus 2E',
        //     },
        //     {
        //         value: 'argus-3-pro',
        //         title: 'Argus 3 Pro',
        //     },
        //     {

        //         value: 'argus-eco',
        //         title: 'Argus Eco',

        //     },
        //     {
        //         value: 'argus-pt',
        //         title: 'Argus PT',
        //     },
        //     {

        //         value: 'argus-pt-pro',
        //         title: 'Argus PT Pro',
        //     },
        //     {

        //         value: 'reolink-go_plus',
        //         title: 'Reolink Go/Reolink Go Plus',
        //     },
        //     {

        //         value: 'reolink-go-pt_plus',
        //         title: 'Reolink Go PT/Reolink Glus',

        //     },
        //     {
        //         value: 'reolink-duo',
        //         title: 'Reolink Duo',
        //     },
        //     {
        //         value: 'reolink-duo-4g',
        //         title: 'Reolink Duo 4G',
        //     },

        // ], // 显示数据： 数据显示类型
        // // 对齐方式： 居中
        // dataSource: [
        //     {
        //         rowTitle: 'For Continuous Recording (Approximately)',
        //         'argus-2e': '15h',
        //         'argus-3-pro': '13h',
        //         'argus-eco': '15h',
        //         'argus-pt': '15h',
        //         'argus-pt-pro': '12h',
        //         'reolink-go_plus': '12h',
        //         'reolink-go-pt_plus': '10h',
        //         'reolink-duo': '12h',
        //         'reolink-duo-4g': '10h'
        //     },
        //     {
        //         rowTitle: 'In Standby Mode (Approximately)',
        //         'argus-2e': '6 Months',
        //         'argus-3-pro': '6 Months',
        //         'argus-eco': '6 Months',
        //         'argus-pt': '6 Months',
        //         'argus-pt-pro': '6 Months',
        //         'reolink-go_plus': '1.5 Months',
        //         'reolink-go-pt_plus': '1 Month',
        //         'reolink-duo': '12 Months',
        //         'reolink-duo-4g': '3 Months'
        //     },
        //     {
        //         rowTitle: 'For Normal Use (Approximately)',
        //         'argus-2e': '3 Months',
        //         'argus-3-pro': '3 Months',
        //         'argus-eco': '3 Months',
        //         'argus-pt': '3 Months',
        //         'argus-pt-pro': '3 Months',
        //         'reolink-go_plus': '1 Month',
        //         'reolink-go-pt_plus': '20 Days',
        //         'reolink-duo': '3 Months',
        //         'reolink-duo-4g': '15 Months'
        //     },
        // ]
    };
    public render(): React.ReactElement {

        return (
            <div className={ 'app-wrap' }>
                <CarouselDemo { ...this.state } />
                {/* <ReoTable
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

                </ReoTable> */}
            </div>
        );
    }
}

export default App;
