"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node imports.
var path = __importStar(require("path"));
// Library imports.
var Datastore = require("nedb");
// The worker that will perform contact operations.
var Worker = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Worker() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    } /* End constructor. */
    /**
     * Lists all contacts.
     *
     * @return A promise that eventually resolves to an array of IContact objects.
     */
    Worker.prototype.listContacts = function () {
        var _this = this;
        console.log("Contacts.Worker.listContacts()");
        return new Promise(function (inResolve, inReject) {
            _this.db.find({}, function (inError, inDocs) {
                if (inError) {
                    console.log("Contacts.Worker.listContacts(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.listContacts(): Ok", inDocs);
                    inResolve(inDocs);
                }
            });
        });
    }; /* End listContacts(). */
    /**
     * Add a new contact.
     *
     * @param  inContact The contact to add.
     * @return           A promise that eventually resolves to an IContact object.
     */
    Worker.prototype.addContact = function (inContact) {
        var _this = this;
        console.log("Contacts.Worker.addContact()", inContact);
        return new Promise(function (inResolve, inReject) {
            _this.db.insert(inContact, function (inError, inNewDoc) {
                if (inError) {
                    console.log("Contacts.Worker.addContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.addContact(): Ok", inNewDoc);
                    inResolve(inNewDoc);
                }
            });
        });
    }; /* End addContact(). */
    /**
     * Delete a contact.
     *
     * @param  inID The ID of the contact to delete.
     * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
     */
    Worker.prototype.deleteContact = function (inID) {
        var _this = this;
        console.log("Contacts.Worker.deleteContact()", inID);
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({ _id: inID }, {}, function (inError, inNumRemoved) {
                if (inError) {
                    console.log("Contacts.Worker.deleteContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.deleteContact(): Ok", inNumRemoved);
                    inResolve("ok");
                }
            });
        });
    }; /* End deleteContact(). */
    /**
   * Delete all contacts.
   *
   * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
   */
    Worker.prototype.deleteAllContact = function () {
        var _this = this;
        console.log("Contacts.Worker.deleteAllContact()");
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({}, { multi: true }, function (inError, inNumRemoved) {
                if (inError) {
                    console.log("Contacts.Worker.deleteAllContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.deleteAllContact(): Ok", inNumRemoved);
                    inResolve("ok");
                }
            });
        });
    }; /* End deleteContact(). */
    /**
     * Update a contact.
     *
     * @param  inID The ID of the contact to delete.
     * @param  inContact The information to update.
     * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
     */
    Worker.prototype.updateContact = function (inID, inContact) {
        var _this = this;
        console.log("Contacts.Worker.updateContact()", inID, inContact);
        return new Promise(function (inResolve, inReject) {
            _this.db.update({ _id: inID }, inContact, {}, function (inError, inNumUpdated, isUpsert) {
                if (inError) {
                    console.log("Contacts.Worker.updateContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.updateContact(): Ok", inNumUpdated);
                    inResolve("ok");
                }
            });
        });
    };
    /**
     * Get a contact's name by email.
     *
     * @param  email The email of the contact to query.
     * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
     */
    Worker.prototype.getContactNameByEmail = function (email) {
        var _this = this;
        console.log("Contacts.Worker.getContactNameByEmail()", email);
        return new Promise(function (inResolve, inReject) {
            _this.db.findOne({ email: email }, function (inError, inDocs) {
                if (inError) {
                    console.log("Contacts.Worker.getContactNameByEmail(): Error", inError);
                    inReject(inError);
                }
                else {
                    var contactName = inDocs.name || "None";
                    console.log("Contacts.Worker.getContactNameByEmail(): Ok", contactName);
                    inResolve(contactName);
                }
            });
        });
    };
    /**
   * Get a contact's email by name.
   *
   * @param  name The name of the contact to query.
   * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
   */
    Worker.prototype.getContactEmailByName = function (name) {
        var _this = this;
        console.log("Contacts.Worker.getContactEmailByName()", name);
        return new Promise(function (inResolve, inReject) {
            _this.db.findOne({ name: name }, function (inError, inDocs) {
                if (inError) {
                    console.log("Contacts.Worker.getContactEmailByName(): Error", inError);
                    inReject(inError);
                }
                else {
                    var contactEmail = inDocs.email || "None";
                    console.log("Contacts.Worker.getContactEmailByName(): Ok", contactEmail);
                    inResolve(contactEmail);
                }
            });
        });
    };
    return Worker;
}()); /* End class. */
exports.Worker = Worker;
//# sourceMappingURL=Contacts.js.map