/* eslint-disable max-len */
import CarouselDemo, { IProps } from '@/basic/ReoButton/demo/carouselButton';
import { ReoLink, ReoSelect, ISelectProps,  } from '@/index';
// import classnames from 'classnames';
import React from 'react';

class App extends React.Component {

    public state: IProps & ISelectProps<string> = {
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
        options: [
            {
                key: 'Products',
                text: 'Products',
                disabled: true
            },
            {
                key: 'Categories',
                text: 'Categories',
                children: [
                    {
                        key: 'Categories-children',
                        text: 'Categories-children',

                    }
                ]
            },
            {
                key: 'Media',
                text: 'Media-Media-Media-Media-Media-Media-Media'
            },
            {
                key: 'FAQs',
                text: 'FAQs'
            },
            {
                key: 'Reviews',
                text: 'Reviews'
            },

            {
                key: 'Products-1',
                text: 'Products-2'
            },
            {
                key: 'Categories-1',
                text: 'Categories-2'
            },
            {
                key: 'Media-1',
                text: 'Media-2'
            },
            {
                key: 'FAQs-1',
                text: 'FAQs-2'
            },
            {
                key: 'Reviews-1',
                text: 'Reviews-2'
            }
        ]

    };
    public render(): React.ReactElement {

        return (
            <div className={ 'app-wrap' }>
                <ReoSelect
                    options={ this.state.options }
                    fullDropDownWords={ true }
                    size={ 'medium' }
                />
                <ReoSelect
                    options={ this.state.options }
                    isSearchable={ true }
                />

                <ReoLink underline={ true }>
                    Learn more
                </ReoLink>
                <ReoLink>
                    # Learn more
                </ReoLink>
                <ReoLink underline={ false }>
                    Learn more
                </ReoLink>
                <ReoLink
                    // transition={ true }
                    icon={ 'icon-icon_contact-support' }
                >
                    Learn more
                </ReoLink>
                {/* TODO: transition为true时应缓动 */}
                <ReoLink
                    transition={ true }
                    title="nihk"
                    // icon={ 'icon-icon_contact-support' }
                    color={ 'red' }
                    underline={ true }
                    hoverUnderline={ false }
                >
                    Learn more
                </ReoLink>

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
