import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, TagService, LabService, InstructionService } from '../_services/index';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';



@Component({
    selector: 'admin-templates',
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.css']
})
export class AdminTemplatesComponent implements OnInit {
    title = "Users";
    private selectedUser: any;
    private blueprintnameOrigin: any = [];
    private selectedLabs: any;
    private Loading: boolean = true;
    private loading: boolean;
    private templates: any = [{ "id": 36929597, "name": "UI-Test-Farm" }, { "id": 51904656, "name": "nginx-tomcat7-mysql" }, { "id": 51904662, "name": "nginx-tomcat6-mysql" }, { "id": 51904658, "name": "nginx-tomcat6-postgres" }, { "id": 51904660, "name": "nginx-tomcat7-postgres" }, { "id": 75204823, "name": "Simple SG" }, { "id": 75401702, "name": "Mid Year WSS Training (MK)" }, { "id": 75434660, "name": "Jon-MYT-BP1" }, { "id": 74584016, "name": "maa-base-ubuntu-bp" }, { "id": 76022780, "name": "MB - SG Lab v0.1" }, { "id": 76021913, "name": "CN Nebula Test Application-bp" }, { "id": 76056333, "name": "SG Small Build-bp" }, { "id": 76745498, "name": "SG-MC-CAS-Reporter/Demogen - Not configured" }, { "id": 75628637, "name": "ATP MYT-bp" }, { "id": 77235173, "name": "CN TEST NEWM-bp" }, { "id": 77202679, "name": "Blue Coat - SG-MC-CAS-Reporter/Demogen-bp-i-bp" }, { "id": 77203461, "name": "Blue Coat - SG with Multiple Domains-bp" }, { "id": 77300357, "name": "WSS POC Template-bp" }];
    private temp: any = [];
    private items: any = [];
    private item: any = [];
    private value: any = ['tag'];
    private itemsToStringTags: any;
    private tagsToStringTags: any;
    private tagsUpdate: any = {};
    private tags: any = [{ "id": 1, "name": "Can extend 2 hour", "description": "User can extend lab by 2 hours", "tagtype": "U", "isprebuilt": true, "created": 1478550944305 }, { "id": 4, "name": "Can extend unlimited", "description": "User can extend lab for unlimited amount of time", "tagtype": "U", "isprebuilt": true, "created": 1478551023688 }, { "id": 9, "name": "1 running application", "description": "Limits number of running apps for user", "tagtype": "U", "isprebuilt": true, "created": 1478551227159 }, { "id": 10, "name": "3 running application", "description": "Limits number of running apps for user to 3", "tagtype": "U", "isprebuilt": true, "created": 1478551309630 }, { "id": 11, "name": "unlimited running application", "description": "Allows user to run unlimited number of applications", "tagtype": "U", "isprebuilt": true, "created": 1478551359294 }, { "id": 14, "name": "Custom for associating with usersets", "description": "Custom for associating with usersets Lab Tag", "tagtype": "L", "isprebuilt": true, "created": 1478551655232 }, { "id": 15, "name": "Custom for associating with demos  ", "description": "Custom for associating with demos  ", "tagtype": "U", "isprebuilt": true, "created": 1478551676946 }, { "id": 143, "name": "Can extend 4 hour", "description": "User can extend lab for 4 hours", "tagtype": "U", "isprebuilt": true, "created": 1479490373124 }, { "id": 5, "name": "Default", "description": "Default user tag", "tagtype": "B", "isprebuilt": true, "created": 1478551036603 }, { "id": 7, "name": "Beta", "description": "Beta user tag", "tagtype": "B", "isprebuilt": true, "created": 1478551127746 }, { "id": 144, "name": "1 saved lab", "description": "User can save one lab", "tagtype": "U", "isprebuilt": true, "created": 1479490493992 }, { "id": 145, "name": "3 saved lab", "description": "User can save three labs", "tagtype": "U", "isprebuilt": true, "created": 1479490512041 }, { "id": 146, "name": "unlimited save lab", "description": "User can save unlmited number of  labs", "tagtype": "U", "isprebuilt": true, "created": 1479490529981 }, { "id": 147, "name": "BulkLab", "description": "Tag used for Bulk Labs", "tagtype": "L", "isprebuilt": true, "created": 1480433098197 }, { "id": 154, "name": "blackhat", "description": "Custom tag for blackhat training", "tagtype": "B", "isprebuilt": false, "created": 1480626606052 }, { "id": 157, "name": "CN TEST", "tagtype": "B", "isprebuilt": false, "created": 1480954643627 }, { "id": 159, "name": "tagname", "description": "tagdescr", "tagtype": "B", "isprebuilt": false, "created": 1481040055215 }, { "id": 169, "name": "ATP", "description": "Tag for advanced threat lab", "tagtype": "B", "isprebuilt": false, "created": 1482355735808 }];
    private tagsTemp: any = [];
    private actived: any;
    private original: any = [];
    private emailTemplate: any = [{ "id": 1, "name": "foo", "templatetext": "Test Template", "created": 0 }, { "id": 2, "name": "Second Email Template", "templatetext": "Second Email Template.  Token is \u003cTOKEN\u003e", "created": 0 }, { "id": 22, "name": "MyNewEmailTemplate", "templatetext": "Test email body with tokens \u003cURL\u003e  \n\n\u003cb\u003eBold\u003c/b\u003e", "created": 0 }, { "id": 30, "name": "Nebula Test Template", "templatetext": "Hello \u003cemail address\u003e,\u003cbr/\u003e\u003cbr/\u003e\n\nThank you for using Nebula to spin up a lab environment.\u003cbr/\u003e \nNote your end user user interface is here: \u003cUI\u003e \u003cbr/\u003e\u003cbr/\u003e\n\nYou can extend and potentially save your lab in the Nebula UI itself. Please reach out to \u003cadmin email address\u003e or click on help if you have questions. You can also find instructions including log ins and IP addresses from the Nebula UI (\u003cneblink\u003e).\u003cbr/\u003e\u003cbr/\u003e\n\nRegards,", "created": 0 }, { "id": 23, "name": "testTrusthtml", "templatetext": "Hello,\n\nThis is an email from Nebula Cloud Labs. This lab includes a Blue Coat SG proxy, Management Center, Reporter and Content Analysis System.\nYour end user UI (used to start labs) is found here:\u003cbr/\u003e\n\u003cUI\u003e\u003cbr/\u003e\u003cbr/\u003e\nThe best way to access the lab is via RDP, screen shot here:\u003cbr/\u003e\n\u003cimg src\u003d\"cid:rdplink\" alt\u003d\"RDP\" style\u003d\"width:304px;height:228px;\"/\u003e\n\u003cbr/\u003e\nAnd here is a link with the private IPs and logins for all systems. \nhttps://symantec.box.com/s/dagwt2l1o3sydt1yj1ejf2fplz9h1rq7\n\u003cbr/\u003e\nPlease reach out if you have problems or questions:\n\u003cadmin email address\u003e\n\u003cbr/\u003e\u003cbr/\u003e\nRegards,\n", "created": 0 }, { "id": 40, "name": "MyNewTemplate", "templatetext": "This is going to be an awesome lab!!!!!!\u003cbr/\u003e", "created": 0 }, { "id": 32, "name": "SG Full Lab", "templatetext": "Hello \u003cemail address\u003e, \u003c/br\u003e \n\u003c/br\u003e\nThis is an email from Nebula Cloud Labs. This lab includes a Blue Coat SG proxy, Management Center, Reporter and Content Analysis System. \u003c/br\u003e\n\u003c/br\u003e\nYour end user UI (used to start labs) is found here: \u003c/br\u003e\n\u003cUI\u003e\n\u003c/br\u003e \u003c/br\u003e\nThe best way to access the lab is via RDP, screen shot here:\u003c/br\u003e\nhttps://symantec.box.com/s/v3vsl2jmf1zc3ct1genhl7j1xjd704sb \u003c/br\u003e\n\u003c/br\u003e\nAnd here is a link with the private IPs and logins for all systems. \u003c/br\u003e\nhttps://symantec.box.com/s/dagwt2l1o3sydt1yj1ejf2fplz9h1rq7 \u003c/br\u003e\n\u003c/br\u003e\nPlease reach out if you have problems or questions:\u003c/br\u003e\n\u003cadmin email address\u003e\u003c/br\u003e\n\u003c/br\u003e\nRegards,\n", "created": 0 }];
    private emailTemp: any = [];
    private emailList: any = [];
    private emailData: any = [];
    private labList: any = [{ "id": 83, "name": "Nebula Test Application", "emailtemplateId": 30, "instructions": "**Test Instructions for display 1**\n**Second Line**", "blueprintid": 76021913, "blueprintname": "CN Nebula Test Application-bp", "created": 1479744816932, "tags": [{ "name": "CN TEST", "labid": 83, "tagid": 157, "created": 0 }, { "name": "blackhat", "labid": 83, "tagid": 154, "created": 0 }, { "name": "BulkLab", "labid": 83, "tagid": 147, "created": 0 }, { "name": "Beta", "labid": 83, "tagid": 7, "created": 0 }, { "name": "Custom for associating with usersets", "labid": 83, "tagid": 14, "created": 0 }] }, { "id": 85, "name": "12/2 demo1 blueprint", "instructions": "demo 1 blueprint example instruction", "blueprintid": 76021913, "blueprintname": "CN Nebula Test Application-bp", "created": 1480691574567, "tags": [{ "name": "Beta", "labid": 85, "tagid": 7, "created": 0 }, { "name": "Default", "labid": 85, "tagid": 5, "created": 0 }, { "name": "Custom for associating with usersets", "labid": 85, "tagid": 14, "created": 0 }] }, { "id": 86, "name": "12/2 demo 2 template ", "instructions": "demo 1 blueprint example instruction", "blueprintid": 76021913, "blueprintname": "CN Nebula Test Application-bp", "created": 1480693493627, "tags": [{ "name": "CN TEST", "labid": 86, "tagid": 157, "created": 0 }, { "name": "blackhat", "labid": 86, "tagid": 154, "created": 0 }] }, { "id": 87, "name": "test tag", "instructions": "Test Instructions", "blueprintid": 75628637, "blueprintname": "ATP MYT-bp", "created": 1480952587466, "tags": [{ "name": "blackhat", "labid": 87, "tagid": 154, "created": 0 }] }];
    val: string = '';
    options = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 43,
        footerHeight: 0,
        rowHeight: 42,
        scrollbarV: true,
        // loadingIndicator: true

    });
    public optimizeOptions = [
        { value: 'Optional', display: 'Optional Template' },
        { value: 'Custom', display: 'Custom Template' }
    ];


    onSubmit($event) {
        // console.log("get you", $event);
        // this.loading = true;
        this.labService.addNewLab($event).subscribe(
            (res) => {
                this.submitSuccess();
                this.getLab();
                // this.loading = false;
            }
        )
    }
    private emailOriginal: any = [];
    onEditEmail(row) {
        this.emailList.forEach(
            e => {
                if (e.id == row.emailtemplateId) {
                    this.emailOriginal = [{ id: e.templatetext, text: e.name }];
                }
            }
        )
    }
    onEdit($event) {
        if ($event.optimizationlevel == "Optional") {
            this.emailList.forEach(
                e => {
                    if (e.id == $event.region) {
                        // this.emailData = { data: e.templatetext, name: e.name };
                        this.emailData = { emailtemplateid: e.id };
                    }
                }
            )
        } else {
            this.emailData = { name: $event.customEmailTitle, data: $event.customEmailData };

        }
        let action = "email"
        this.labService.modifyTemplateDetail(this.selectedUser.id, action, this.emailData).subscribe(
            val => {
                console.log("succeed")
                this.getLab();

            }, err => {
                console.log(err)
            }
        )

    }
    private instructionData: any = {};
    onSend($event) {
        this.instructionData = { data: $event };
        let action = "instr"
        this.labService.modifyTemplateDetail(this.selectedUser.id, action, this.instructionData).subscribe(
            val => {
                console.log("succeed");
                this.getLab();
            }, err => {
                console.log(err)
            }
        )
    }
    updateTemplate() {
        let action = "blueprint"
        this.labService.modifyTemplateDetail(this.selectedUser.id, action, { blueprintid: this.updatedTemplate.id }).subscribe(
            val => {
                console.log("finish updateTemplate()");
                this.getLab();
            }, err => {
                console.log(err)
            }
        )
    }
    private templateTemp: any = []
    ngOnInit() {
        this.getLab();
        this.getLabTag();
        this.getEmailTemplate();
        // get templates list 
        let e = [{ "id": 36929597, "name": "UI-Test-Farm" }, { "id": 51904656, "name": "nginx-tomcat7-mysql" }, { "id": 51904662, "name": "nginx-tomcat6-mysql" }, { "id": 51904658, "name": "nginx-tomcat6-postgres" }, { "id": 51904660, "name": "nginx-tomcat7-postgres" }, { "id": 75204823, "name": "Simple SG" }, { "id": 75401702, "name": "Mid Year WSS Training (MK)" }, { "id": 75434660, "name": "Jon-MYT-BP1" }, { "id": 74584016, "name": "maa-base-ubuntu-bp" }, { "id": 76022780, "name": "MB - SG Lab v0.1" }, { "id": 76021913, "name": "CN Nebula Test Application-bp" }, { "id": 76056333, "name": "SG Small Build-bp" }, { "id": 76745498, "name": "SG-MC-CAS-Reporter/Demogen - Not configured" }, { "id": 75628637, "name": "ATP MYT-bp" }, { "id": 77235173, "name": "CN TEST NEWM-bp" }, { "id": 77202679, "name": "Blue Coat - SG-MC-CAS-Reporter/Demogen-bp-i-bp" }, { "id": 77203461, "name": "Blue Coat - SG with Multiple Domains-bp" }, { "id": 77300357, "name": "WSS POC Template-bp" }]

        e.forEach((e) => {
            this.templateTemp.push({ id: e.id, text: e.name })
            this.templates = this.templateTemp;


        })

        // this.userService.getTemplates().subscribe(
        //     e => {
        //         e.forEach((e) => {
        //             this.templateTemp.push({ id: e.id, text: e.name })
        //             this.templates = this.templateTemp;


        //         })
        //     },
        //     err => console.error(err)

        // )
    }
    gotoDetail(value): void {
        this.selectedUser = value;
        if (this.selectedUser.blueprintname) {
            this.blueprintnameOrigin = [{ id: this.selectedUser.id, text: this.selectedUser.blueprintname }]
        } else {
            this.blueprintnameOrigin = [{ id: "", text: "" }]
        }

    }
    updateFilter(val) {
        let va = val.toLowerCase();
        // remove existing
        this.labList.splice(0, this.labList.length);
        // filter our data
        let temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(va) !== -1 || !va;
        });
        // update the rows
        this.labList.push(...temp);
    }
    go() {
        window.alert(
            "hello world"
        )
    }
    Done(value) {
        //update the current tag
        this.loading = true;
        if (this.value.length) {
            this.value.forEach(
                (e) => {
                    this.tagsTemp.push({ labid: this.selectedLabs.id, tagid: e.id })
                    this.tags = this.tagsTemp;

                })
        } else {
            this.tags = this.original;
        }

        this.tagsTemp = [];
        this.tagsUpdate = { id: this.selectedLabs.id, tags: this.tags };
        //call to make the change
        this.labService.updateLabTags(this.tagsUpdate).subscribe(
            (e) => {
                this.getLab();
                this.loading = false;
            }
        )
    }

    add(row) {
        let cc = row.tags;
        this.actived = [];
        this.original = [];

        cc.forEach((item) => {
            this.actived.push({ id: item.tagid, text: item.name });
            this.original.push({ tagid: item.tagid, labid: item.labid });
        })
        this.selectedLabs = row;
        this.value = [];
    }


    constructor(
        private router: Router,
        private userService: UserService,
        private tagService: TagService,
        private labService: LabService,
        private instructionService: InstructionService
    ) { }


    public getLab() {
        this.labService.getLabs().subscribe(
            e => {
                this.labList = e;
                this.temp = [...e];
                this.Loading = false;

            },
            err => console.error(err)

        )
    }
    public getLabTag() {
        //get the list of tags 
        let e = [{ "id": 1, "name": "Can extend 2 hour", "description": "User can extend lab by 2 hours", "tagtype": "U", "isprebuilt": true, "created": 1478550944305 }, { "id": 4, "name": "Can extend unlimited", "description": "User can extend lab for unlimited amount of time", "tagtype": "U", "isprebuilt": true, "created": 1478551023688 }, { "id": 9, "name": "1 running application", "description": "Limits number of running apps for user", "tagtype": "U", "isprebuilt": true, "created": 1478551227159 }, { "id": 10, "name": "3 running application", "description": "Limits number of running apps for user to 3", "tagtype": "U", "isprebuilt": true, "created": 1478551309630 }, { "id": 11, "name": "unlimited running application", "description": "Allows user to run unlimited number of applications", "tagtype": "U", "isprebuilt": true, "created": 1478551359294 }, { "id": 14, "name": "Custom for associating with usersets", "description": "Custom for associating with usersets Lab Tag", "tagtype": "L", "isprebuilt": true, "created": 1478551655232 }, { "id": 15, "name": "Custom for associating with demos  ", "description": "Custom for associating with demos  ", "tagtype": "U", "isprebuilt": true, "created": 1478551676946 }, { "id": 143, "name": "Can extend 4 hour", "description": "User can extend lab for 4 hours", "tagtype": "U", "isprebuilt": true, "created": 1479490373124 }, { "id": 5, "name": "Default", "description": "Default user tag", "tagtype": "B", "isprebuilt": true, "created": 1478551036603 }, { "id": 7, "name": "Beta", "description": "Beta user tag", "tagtype": "B", "isprebuilt": true, "created": 1478551127746 }, { "id": 144, "name": "1 saved lab", "description": "User can save one lab", "tagtype": "U", "isprebuilt": true, "created": 1479490493992 }, { "id": 145, "name": "3 saved lab", "description": "User can save three labs", "tagtype": "U", "isprebuilt": true, "created": 1479490512041 }, { "id": 146, "name": "unlimited save lab", "description": "User can save unlmited number of  labs", "tagtype": "U", "isprebuilt": true, "created": 1479490529981 }, { "id": 147, "name": "BulkLab", "description": "Tag used for Bulk Labs", "tagtype": "L", "isprebuilt": true, "created": 1480433098197 }, { "id": 154, "name": "blackhat", "description": "Custom tag for blackhat training", "tagtype": "B", "isprebuilt": false, "created": 1480626606052 }, { "id": 157, "name": "CN TEST", "tagtype": "B", "isprebuilt": false, "created": 1480954643627 }, { "id": 159, "name": "tagname", "description": "tagdescr", "tagtype": "B", "isprebuilt": false, "created": 1481040055215 }, { "id": 169, "name": "ATP", "description": "Tag for advanced threat lab", "tagtype": "B", "isprebuilt": false, "created": 1482355735808 }];
        e.forEach((val) => {
            //get the tags only for lab
            if (val.tagtype == 'L' || val.tagtype == 'B') {
                this.item.push({ id: val.id, text: val.name })
            }
            this.items = this.item.sort((a, b) => {
                return a.text - b.text || a.text.localeCompare(b.text)
            })
        })
        this.tagService.getUserTags().subscribe(
            e => {
                e.forEach((val) => {
                    //get the tags only for lab
                    if (val.tagtype == 'L' || val.tagtype == 'B') {
                        this.item.push({ id: val.id, text: val.name })
                    }
                    this.items = this.item.sort((a, b) => {
                        return a.text - b.text || a.text.localeCompare(b.text)
                    })
                })
            }
        )
    }


    public getEmailTemplate() {
        this.emailList = [{ "id": 1, "name": "foo", "templatetext": "Test Template", "created": 0 }, { "id": 2, "name": "Second Email Template", "templatetext": "Second Email Template.  Token is \u003cTOKEN\u003e", "created": 0 }, { "id": 22, "name": "MyNewEmailTemplate", "templatetext": "Test email body with tokens \u003cURL\u003e  \n\n\u003cb\u003eBold\u003c/b\u003e", "created": 0 }, { "id": 30, "name": "Nebula Test Template", "templatetext": "Hello \u003cemail address\u003e,\u003cbr/\u003e\u003cbr/\u003e\n\nThank you for using Nebula to spin up a lab environment.\u003cbr/\u003e \nNote your end user user interface is here: \u003cUI\u003e \u003cbr/\u003e\u003cbr/\u003e\n\nYou can extend and potentially save your lab in the Nebula UI itself. Please reach out to \u003cadmin email address\u003e or click on help if you have questions. You can also find instructions including log ins and IP addresses from the Nebula UI (\u003cneblink\u003e).\u003cbr/\u003e\u003cbr/\u003e\n\nRegards,", "created": 0 }, { "id": 23, "name": "testTrusthtml", "templatetext": "Hello,\n\nThis is an email from Nebula Cloud Labs. This lab includes a Blue Coat SG proxy, Management Center, Reporter and Content Analysis System.\nYour end user UI (used to start labs) is found here:\u003cbr/\u003e\n\u003cUI\u003e\u003cbr/\u003e\u003cbr/\u003e\nThe best way to access the lab is via RDP, screen shot here:\u003cbr/\u003e\n\u003cimg src\u003d\"cid:rdplink\" alt\u003d\"RDP\" style\u003d\"width:304px;height:228px;\"/\u003e\n\u003cbr/\u003e\nAnd here is a link with the private IPs and logins for all systems. \nhttps://symantec.box.com/s/dagwt2l1o3sydt1yj1ejf2fplz9h1rq7\n\u003cbr/\u003e\nPlease reach out if you have problems or questions:\n\u003cadmin email address\u003e\n\u003cbr/\u003e\u003cbr/\u003e\nRegards,\n", "created": 0 }, { "id": 40, "name": "MyNewTemplate", "templatetext": "This is going to be an awesome lab!!!!!!\u003cbr/\u003e", "created": 0 }, { "id": 32, "name": "SG Full Lab", "templatetext": "Hello \u003cemail address\u003e, \u003c/br\u003e \n\u003c/br\u003e\nThis is an email from Nebula Cloud Labs. This lab includes a Blue Coat SG proxy, Management Center, Reporter and Content Analysis System. \u003c/br\u003e\n\u003c/br\u003e\nYour end user UI (used to start labs) is found here: \u003c/br\u003e\n\u003cUI\u003e\n\u003c/br\u003e \u003c/br\u003e\nThe best way to access the lab is via RDP, screen shot here:\u003c/br\u003e\nhttps://symantec.box.com/s/v3vsl2jmf1zc3ct1genhl7j1xjd704sb \u003c/br\u003e\n\u003c/br\u003e\nAnd here is a link with the private IPs and logins for all systems. \u003c/br\u003e\nhttps://symantec.box.com/s/dagwt2l1o3sydt1yj1ejf2fplz9h1rq7 \u003c/br\u003e\n\u003c/br\u003e\nPlease reach out if you have problems or questions:\u003c/br\u003e\n\u003cadmin email address\u003e\u003c/br\u003e\n\u003c/br\u003e\nRegards,\n", "created": 0 }]
        this.emailList.forEach(
            val => {
                this.emailTemp.push({ id: val.id, text: val.name })
            }
        )
        this.emailTemplate = this.emailTemp;
        this.emailTemp = [];
        // this.labService.getTemplateDetailData().subscribe(
        //     e => {
        //         this.emailList = e;
        //         this.emailList.forEach(
        //             val => {
        //                 this.emailTemp.push({ id: val.id, text: val.name })
        //             }
        //         )
        //         this.emailTemplate = this.emailTemp;
        //         this.emailTemp = [];
        //     }
        // )
    }
    private updatedTemplate: any = [];
    public selected(value: any): void {
        this.updatedTemplate = value;
        console.log('updatedTemplate: ', this.updatedTemplate.id, '999==>', this.selectedUser.id);

    }
    update() {
        this.updatedTemplate = ''
    }

    public removed(value: any): void {
        // console.log('Removed value is: ', value);
    }

    public refreshValue(value: any): void {
        this.value = value;
        // console.log("this.value", this)
        // console.log("this.value", this.value)
        return this.value;
    }
    public itemsToString(value: Array<any> = []): string {

        this.itemsToStringTags = value
            .map((item: any) => {
                return item.id;
            }).join(',');

        return this.itemsToStringTags;
    }
    public tagsToString(value: Array<any> = []): string {

        this.tagsToStringTags = value
            .map((item: any) => {
                return item.name;
            }).join(',');

        return this.tagsToStringTags;
    }
    private submitSuccess() {
        this.router.navigate(['admin/templates'])
    }
}
