import { ValidationError } from "../errors/errors-handle";

const validate = (req: any, schema: any) => {
  let val = schema.safeParse(req);
  
  if (!val.success) {
    let key="";
    let err={} as Record<string, string[]>;
    val.error.issues.forEach((issue:any) => {
      if(issue.code === 'unrecognized_keys'){
        err['unknown_field'] ||= [];
        err['unknown_field'].push(`Unknown field ${issue.keys} !`);
        return;
      }
      key = issue.path.join('.');
      err[key] ||= [];
      err[key].push(`${issue.message}`);
    });
    // throw new ValidationError('Validation Failed ', val.error.flatten().fieldErrors, 422);//test
    throw new ValidationError('Validation Failed ', err, 422);
  }
  return val.data;
}
export {
  validate
};  