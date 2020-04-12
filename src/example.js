const example = {
    name: 'chaz',
    'dark-mode': true,
    config: {
        links: {
            'link-1': {
                id: 'link-1',
                name: 'Reddit',
                url: 'https://www.reddit.com'
            },
            'link-2': {
                id: 'link-2',
                name: 'Steam',
                url: 'https://store.steampowered.com/'
            },
            'link-3': {
                id: 'link-3',
                name: 'Instagram',
                url: 'https://www.Instagram.com'
            },
            'link-4': {
                id: 'link-4',
                name: 'Inbox',
                url: 'https://www.mail.google.com'
            },
            'link-5': {
                id: 'link-5',
                name: 'Discord',
                url: 'https://www.discord.com'
            },
            'link-6': { id: 'link-6', name: 'Imgur', url: 'https://www.imgur.com' },
            'link-7': {
                id: 'link-7',
                name: 'Twitter',
                url: 'https://www.twitter.com'
            },
            'link-8': {
                id: 'link-8',
                name: 'Rust Dev Log',
                url: 'https://www.facepunch.com'
            },
            'link-9': {
                id: 'link-9',
                name: 'PUBG News',
                url: 'https://www.playbattlegrounds.com'
            },
            'link-10': {
                id: 'link-10',
                name: 'CS:GO Path Notes',
                url: 'https://www.blog.counter-strike.net/index.php/category/updates/'
            },
            'link-11': {
                id: 'link-11',
                name: 'Youtube',
                url: 'https://www.youtube.com'
            },
            'link-12': {
                id: 'link-12',
                name: 'Twitch',
                url: 'https://www.twitch.tv'
            },
            'link-13': {
                id: 'link-13',
                name: 'Netflix',
                url: 'https://www.netflix.com'
            },
            'link-14': {
                id: 'link-14',
                name: 'Channel4',
                url: 'https://www.channel4.com'
            },
            'link-15': {
                id: 'link-15',
                name: 'BBC iPlayer',
                url: 'https://www.bbc.co.uk/iplayer'
            },
            'link-16': {
                id: 'link-16',
                name: 'BundleID',
                url: 'https://www.offcornerdev.com'
            },
            'link-17': {
                id: 'link-17',
                name: 'Apple Identifiers',
                url: 'https://pinpal.github.io/stock-identifiers/'
            },
            'link-18': {
                id: 'link-18',
                name: 'Icloud',
                url: 'https://www.icloud.com'
            },
            'link-19': {
                id: 'link-19',
                name: 'MediaFire',
                url: 'https://www.mediafire.com'
            },
            'link-20': {
                id: 'link-20',
                name: 'Speedtest',
                url: 'https://www.Speedtest.com'
            },
            'link-21': {
                id: 'link-21',
                name: 'FileMail',
                url: 'https://www.FileMail.com'
            },
            'link-22': { id: 'link-22', name: 'Goo.gl', url: 'https://www.Goo.gl' },
            'link-23': {
                id: 'link-23',
                name: 'TempMail',
                url: 'https://www.TempMail.com'
            },
            'link-24': { id: 'link-24', name: 'ebay', url: 'https://www.ebay.com' },
            'link-25': {
                id: 'link-25',
                name: 'Amazon',
                url: 'https://www.Amazon.com'
            },
            'link-26': {
                id: 'link-26',
                name: 'PayPal',
                url: 'https://www.PayPal.com'
            },
            'link-27': {
                id: 'link-27',
                name: 'LLoyds Bank',
                url: 'https://www.LLoydsBank.com'
            },
            'link-28': {
                id: 'link-28',
                name: 'PCPartPicker',
                url: 'https://www.PCPartPicker.com'
            },
            'link-29': { id: 'link-29', name: 'IKea', url: 'https://www.IKea.com' },
            'link-30': {
                id: 'link-30',
                name: 'PvPro',
                url: 'https://www.pvpro.com'
            },
            'link-31': {
                id: 'link-31',
                name: 'Derank',
                url: 'https://www.derank.me'
            },
            'link-32': {
                id: 'link-32',
                name: 'Workshop',
                url: 'https://steamcommunity.com/workshop/browse/?appid=730'
            }
        },
        boxes: {
            'box-1': {
                id: 'box-1',
                name: 'Social',
                type: 'links',
                linkOrder: [
                    'link-1',
                    'link-2',
                    'link-3',
                    'link-4',
                    'link-5',
                    'link-6',
                    'link-7'
                ]
            },
            'box-2': {
                id: 'box-2',
                name: 'Updates',
                type: 'links',
                linkOrder: ['link-8', 'link-9', 'link-10']
            },
            'box-3': {
                id: 'box-3',
                name: 'Videos',
                type: 'links',
                linkOrder: ['link-11', 'link-12', 'link-13', 'link-14', 'link-15']
            },
            'box-4': {
                id: 'box-4',
                name: 'iOS',
                type: 'links',
                linkOrder: ['link-16', 'link-17']
            },
            'box-5': {
                id: 'box-5',
                name: 'Cloud',
                type: 'links',
                linkOrder: ['link-18', 'link-19']
            },
            'box-6': {
                id: 'box-6',
                name: 'Utilities',
                type: 'links',
                linkOrder: ['link-20', 'link-21', 'link-22', 'link-23']
            },
            'box-7': {
                id: 'box-7',
                name: 'Shopping',
                type: 'links',
                linkOrder: [
                    'link-24',
                    'link-25',
                    'link-26',
                    'link-27',
                    'link-28',
                    'link-29'
                ]
            },
            'box-8': {
                id: 'box-8',
                name: 'CS:GO',
                type: 'links',
                linkOrder: ['link-30', 'link-31']
            },
            'box-9': {
                id: 'box-9',
                name: 'Weather',
                type: 'widget',
                widgetType: 'weather'
            }
        },
        columns: {
            'column-1': {
                id: 'column-1',
                boxOrder: ['box-1', 'box-2']
            },
            'column-2': {
                id: 'column-2',
                boxOrder: ['box-3', 'box-4', 'box-5']
            },
            'column-3': {
                id: 'column-3',
                boxOrder: ['box-6', 'box-7']
            },
            'column-4': {
                id: 'column-4',
                boxOrder: ['box-8', 'box-9']
            }
        },
        columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
    }
};
export default example;
