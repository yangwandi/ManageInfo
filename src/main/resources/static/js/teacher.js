var teacher = {
		template : `
		<div>
			<el-button type="primary" icon="el-icon-edit" class="addButton" @click="AddTeacher">增加老师</el-button>
			<el-table
		    ref="filterTable"
		    :data="pageData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    
		     /*工号*/
		    <el-table-column
		      prop="id"
		      label="工号"
		      width="120">
		    </el-table-column>
		    
		     /*姓名*/
		    <el-table-column
		      prop="name"
		      label="姓名"
		      width="120">
		    </el-table-column>
		    
		    /*性别*/
		    <el-table-column
		      prop="sex"
		      label="性别"
		      width="120">
		    </el-table-column>
		    
		    /*出生日期*/
		    <el-table-column
		      label="出生日期"
		      width="120"
		      prop="birth"
		      column-key="birth"
		      :filters="filtersData"
		      :filter-method="filterHandler"
		      filter-placement="bottom-end"
		      >
		      <template slot-scope="scope">{{ scope.row.birth }}</template>
		    </el-table-column>
		    
		    /*职称*/
		     <el-table-column
		      prop="position"
		      label="职称"
		      width="120">
		    </el-table-column>
		    
		    /*学院*/
		     <el-table-column
		      prop="college.name"
		      label="学院"
		      width="120">
		    </el-table-column>
		    
		     
		     <el-table-column
			      align="right">
			      <template slot="header" slot-scope="scope">
			        <el-input
			          v-model="search"
			          size="mini"
			          placeholder="输入关键字搜索"/>
			      </template>
			      
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
			      </template>
			  </el-table-column>
			  <el-button type="text" ></el-button>
			  
		  </el-table>
		
		<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-size="pagesize"
	       background
	      layout="total,prev, pager, next, jumper"
	      :total="allnum">
	    </el-pagination>
		
		<el-dialog title="教师信息" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    
		    <el-form-item label="姓名" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="性别" :label-width="formLabelWidth">
		      <el-select v-model="form.sex" placeholder="请选择性别">
		        <el-option label="男"  value="男"></el-option>
		        <el-option label="女"  value="女"></el-option>
		      </el-select>
		    </el-form-item>
		    
		    <el-form-item label="出生日期" :label-width="formLabelWidth">
		    	 <el-date-picker
			      v-model="form.birth"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
		    </el-form-item>
			 
			<el-form-item label="职称" :label-width="formLabelWidth">
			     <el-select v-model="form.position" placeholder="请选择职称">
			        <el-option label="教授"  value="教授"></el-option>
			        <el-option label="副教授"  value="副教授"></el-option>
			        <el-option label="讲师"  value="讲师"></el-option>
			      </el-select>
		    </el-form-item>
		    
		     <el-form-item label="所属学院" :label-width="formLabelWidth">
			     <el-select v-model="form.college.id" placeholder="请选择学院">
			        <el-option v-for="(item,index) in collegeData" :key="item.value" :label="item.name"  v-bind:value="item.id"></el-option>
			      </el-select>
		    </el-form-item>
		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitChange">确 定</el-button>
		</div>
		</el-dialog>
		
		</div>
			`,
			 data: function(){
				 return {
					 tableData: [],
					 pageData:[],
					 collegeData:[],
					 majorData:[],
				        multipleSelection: [],
				        /*分页是否打开*/
				        hidevalue:false,
				        currentPage:1,
				        allnum:4,
				        /*每一页的数量*/
				        pagesize:5,
				        search: '',
				         /*弹框是否打开*/
				        dialogFormVisible: false,
				        form: {
				        	id:'',
				            name: '',
				            sex: '',
				            birth: '',
				            college:{'id':1},
				            position:''
				        },
				        /*状态为0：修改 状态为1：添加*/
				        status:0,
				        formLabelWidth: '120px',
				        filtersData:[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]
				      }
		    },
		    methods: {
		    	submitChange(){
		    		console.log(this.status);
		    		this.dialogFormVisible = false;

		    		/*如果未添加*/
		    		if(this.status==1){
		    			console.log(this.form);
		    			axios.post('/teacher/teacher',this.form).then(res=>{
		    				res = res.data;
//		    				console.log(res);
		    				if(res.result === true) {
		    					// 成功后刷新列表
		    					this.loadTeachers();
		    				}else{
		    					  alert(res.msg);
		    				}
		    			}).catch(err=>{
		    				console.error(err);
		    				alert(res.msg);
		    			});
		    		}
		    		/*为修改*/
		    		else{
		    			axios.put('/teacher/teacher',this.form).then(res=>{
		    				res = res.data;
//		    				console.log(res);
		    				if(res.result === true) {
		    					// 成功后刷新列表
		    					this.loadTeachers();
		    				}else{
		    					  alert(res.msg);
		    				}
		    			}).catch(err=>{
		    				console.error(err);
		    				alert(res.msg);
		    			});
		    		}
		    	},
		        handleSelectionChange(val) {
		          this.multipleSelection = val;
		        },
		        filterHandler(value, row, column) {
		            const property = column['property'];
		            return row[property] === value;
		        },
		        handleSizeChange(val){
		        	console.log(val);
		        },
		        /*页面修改数据*/
		        handleCurrentChange(val){
//		        	console.log(val);
		        	/*开始数据 页数*每一页的数量*/
		        	let st=this.pagesize*(val-1);
		        	let et=st+this.pagesize;
		        	this.pageData=this.tableData.slice(st,et);
		        },
		        handleEdit(index, row) {
		            //console.log(index, row);
		            if(this.dialogFormVisible==false){
		    			this.dialogFormVisible=true;
		    			this.form=this.tableData[index];
		    			
		    			/*加载学院动态显示*/
		    			this.loadColleges();
		    		}
		        },
		        handleDelete(index, row) {
		            console.log(index, row);
		            console.log(row.id);
		            axios.delete('/teacher/teacher/'+row.id).then(res=>{
		            	  console.log(res);
					       res = res.data;
					       if(res.result){
					         this.loadTeachers();
					         
					         if(res.result){
						         this.loadTeachers();
						         this.$notify({
						             title: '成功',
						             message: '成功删除教师',
						             type: 'success'
						           });
						       }
					       }
					     
					     }).catch(err=>{
					       console.log(err);
					       alert('网络请求异常，请重试!');
					     });
		        },
		        AddTeacher(){
		        	 if(this.dialogFormVisible==false){
		    			this.dialogFormVisible=true;
		    			this.form={
					            name: '',
					            sex: '',
					            birth: '',
					            college:{'id':'','name':''},
					            position:''
					          };
		    			this.status=1;
		    			/*加载学院 动态显示*/
		    			this.loadColleges();
			    	}
		        },
		        loadTeachers(){
		        	axios.get("/teacher/allTeacher").then(res=>{ //res 是返回对象
						res = res.data;
						//console.log(res);
						var returnData=res.rows;
						var len=returnData.length;
						if(res.result === true){
							this.tableData = res.rows;
							/*修改表格显示数据 与总的页数*/
							this.pageData=this.tableData.slice(0,Math.min(this.pagesize,len+1));
							this.allnum=len;
						}else{
							alter(res.msg);   //显示查询错误
						}
					}).catch(err=>{
						console.log(err);
					});
		        },
		        /*查询学院信息 更新添加*/
		        loadColleges(){
		        	axios.get("/college/college").then(res=>{ //res 是返回对象
						res = res.data;
						
						if(res.result === true){
							this.collegeData = res.rows;
						}else{
							alter(res.msg);   //显示查询错误
						}
					}).catch(err=>{
						console.log(err);
					});
		        }
		      },
		    mounted: function(){
		    	this.loadTeachers();
		      }
}