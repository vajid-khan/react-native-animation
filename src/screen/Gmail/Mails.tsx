import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableNativeFeedback,
} from "react-native";

class Mails extends Component {

    state = {
        mails: [
            {
                id: 0,
                read: false
            },
            {
                id: 1,
                read: false
            },
            {
                id: 2,
                read: false
            },
            {
                id: 3,
                read: false
            },
            {
                id: 4,
                read: false
            },
            {
                id: 5,
                read: false
            },
            {
                id: 6,
                read: false
            },
            {
                id: 7,
                read: false
            },
            {
                id: 8,
                read: false
            },
            {
                id: 9,
                read: false
            },
            {
                id: 10,
                read: false
            },
            {
                id: 11,
                read: false
            },
            {
                id: 12,
                read: false
            }

        ]
    }

    markAsRead = (mail: Object) => {
        const mails = this.state.mails;
        mails[mail.id].read = true;
        this.setState(mails);

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    {
                        this.state.mails.map((mail, index) => <MailItem markAsRead={() => this.markAsRead(mail)} mail={mail} key={index} />)
                    }
                </ScrollView>
            </View>
        );
    }
}


const MailItem = ({ mail, markAsRead }) => (
    <TouchableNativeFeedback
        onPress={markAsRead}
    // background={TouchableNativeFeedback.Ripple('#eee')}
    >
        <View style={styles.mailItem}>
            <View style={styles.mailIconBox}>
                <Image
                    source={require('../../assets/images/image-3.jpg')}
                    style={styles.mailIcon} />
            </View>
            <View style={styles.contentBox}>
                <View style={styles.senderBox}>
                    <Text style={styles.senderText}>
                        Vajid Khan
                    </Text>
                </View>
                <View style={styles.subjectBox}>
                    <Text style={[styles.subjextText, mail.read ? styles.readMail : {}]}>
                        Reminder from React Team
                    </Text>
                </View>
                <View style={styles.bodyBox}>
                    <Text
                        style={[styles.bodyText, mail.read ? styles.readMail : {}]}
                        numberOfLines={2}
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis quam sequi beatae fugiat minus magnam officia rerum dolor officiis culpa nulla incidunt ut, in saepe animi quasi dignissimos voluptatem nisi.
                    </Text>
                </View>
            </View>
        </View>
    </TouchableNativeFeedback>
);

export default Mails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mailItem: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: 10,
        // borderWidth: 1,
        // borderColor: 'white',
        flexDirection: 'row',
        zIndex: 10,
    },
    mailIconBox: {
        flex: 2,
        justifyContent: 'center'
    },
    mailIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'cover'
    },
    contentBox: {
        flex: 8
    },
    senderBox: {

    },
    senderText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    subjectBox: {

    },
    subjextText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    bodyBox: {

    },
    bodyText: {
        fontSize: 15,
        color: 'white',
    },
    readMail: {
        color: '#ADADC9'
    },
    separator: {

    }
});