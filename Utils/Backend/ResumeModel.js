import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const personalInfoSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String},
    phone : { type: String},
    linkedin : { type: String},
    personalSite : { type: String },
    country: { type: String},
    city: { type: String},
    state: { type: String }
});

const educationSchema = new Schema({
    qualification: { type: String, required: true },
    institute: { type: String, required: true },
    specialization: { type: String, required: true },
    duration: { type: String, required: true },
    score : { type: String, required: true }
});

const experienceSchema = new Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String, required: true },
    description: [{ type: String}]
});

const projectSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String},
    description: [{ type: String}]
});

const skillSchema = new Schema({
    tag : { type: String, required: true },
    skills: { type: String, required: true }
});


const extraCurricular = new Schema({
    title:{type:String,required:true},
    issuedBy:{type:String,required:true},
    date:{type:String,required:true},
    url:{type:String,required:true}
} )

const ResumeSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    data :{
        personalInfo: personalInfoSchema,
        education: [educationSchema],
        experience: [experienceSchema],
        projects: [projectSchema],
        skills: [skillSchema],
        extraCurricular: [extraCurricular]        
    }
},
{timestamps: true}
);

mongoose.models = {};

export const ResumeModel = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);