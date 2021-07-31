import { storageService } from '../../../../js/services/async-storage-service.js'
import { utilService } from '../../../../js/services/util-service.js'

const MAILS_KEY = 'mails'
export const mailService = {
	getMails,
	getMailById,
	deleteMail,
	addMail,
	unreadMail,
	readMail,
	toggleStar,
	getNextMailId,
	getPrevMailId,
	formatNoteAsMail,
}

var gMails = _createMails()

function getMails() {
	return storageService.query(MAILS_KEY).then(mails => {
		if (!mails || !mails.length) {
			utilService.saveToStorage(MAILS_KEY, gMails)
			return Promise.resolve(gMails)
		}
		return mails
	})
}

function addMail(mailData) {
	const { to, cc, bcc, subject, body } = mailData
	if (cc.indexOf(',') !== -1) {
		cc = cc.split(',')
	}
	if (bcc.indexOf(',') !== -1) {
		bcc = bcc.split(',')
	}
	const mail = _createMail(undefined, cc, bcc, subject, body)
	mail.isSent = true
	return storageService.post(MAILS_KEY, mail)
}

function deleteMail(mailId) {
	return storageService.remove(MAILS_KEY, mailId)
}

function getMailById(mailId) {
	return storageService.get(MAILS_KEY, mailId)
}

function unreadMail(mailId) {
	return getMailById(mailId).then(mail => {
		mail.isRead = false
		return storageService.put(MAILS_KEY, mail)
	})
}

function readMail(mailId) {
	return getMailById(mailId).then(mail => {
		mail.isRead = true
		return storageService.put(MAILS_KEY, mail)
	})
}

function toggleStar(mailId) {
	return getMailById(mailId).then(mail => {
		mail.isStarred = !mail.isStarred
		return storageService.put(MAILS_KEY, mail)
	})
}

function getNextMailId(mailId) {
	return getMails().then(mails => {
		const idx = mails.findIndex(mail => mail.id === mailId)
		return idx === mails.length - 1 ? mails[0].id : mails[idx + 1].id
	})
}

function getPrevMailId(mailId) {
	return getMails().then(mails => {
		const idx = mails.findIndex(mail => mail.id === mailId)
		return idx === 0 ? mails[mails.length - 1].id : mails[idx - 1].id
	})
}

function formatNoteAsMail(note) {
	const { id, info, title, style } = note
	const mail = {
		id,
		to: ['Dandan'],
		cc: ['Dandan'],
		bcc: ['Dandan'],
		subject: title,
		body: info.txt,
		color: style.backgroundColor,
	}
	return addMail(mail).then(newMail => {
		return newMail
	})
}

function _createMails() {
	return [
		_createMail(undefined, ['Dandan'], ['Dandan'], 'Wassap?', 'Pick up!'),
		_createMail(undefined, ['Dandan'], ['Dandan'], 'Vue.js', 'Hello Vue'),
		_createMail(undefined, ['Dandan'], ['Dandan'], 'Wat Wat!!!', 'What?'),
		_createMail(undefined, ['Dandan'], ['Dandan'], 'Kidding?', "I'm joking don't worry!"),
	]
}

function _createMail(to = 'Dandan', cc, bcc, subject, body) {
	const id = utilService.makeId()
	return {
		id,
		sender: {
			name: 'Dandan',
			id,
		},
		recipient: {
			name: 'Dandan',
			id,
		},
		to,
		cc,
		bcc,
		subject,
		body,
		isRead: false,
		isSent: false,
		isStarred: false,
		sentAt: Date.now(),
		color: utilService.getRandomColor(),
	}
}
