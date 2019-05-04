<template>
    <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" class="input-with-select" style="width:200px" v-model="usersValue">
            <el-button slot="append" icon="el-icon-search" @click="getuserslist(1)"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left: 30px;" @click="dialogFormVisible = true">添加用户</el-button>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            width="50">
            </el-table-column>
            <el-table-column
            prop="username"
            label="姓名"
            width="180">
            </el-table-column>
             <el-table-column
            prop="email"
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="mobile"
            label="电话">
            </el-table-column>          
            <el-table-column
            prop="mg_state"
            label="用户状态">
             <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.mg_state"
                    @change="changeUserStatus(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
             </template>
            </el-table-column>       
            <el-table-column
            prop="address"
            label="操作">
             <template slot-scope="scope">
                <el-button
                size="mini"
                @click="$refs.editEL.showedit(scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
                <el-button
                size="mini"
                type="primary"
                @click="assignroles(scope.$index, scope.row)">分配角色</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 添加用户弹出框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="addfrom" :rules="rules" ref="ruleForm">
            <el-form-item label="用户名" label-width="80px" prop="username">
            <el-input v-model="addfrom.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
            <el-input v-model="addfrom.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px" prop="email">
            <el-input v-model="addfrom.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="80px" prop="mobile">
            <el-input v-model="addfrom.mobile"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sumitUserlist">确 定</el-button>
        </div>
        </el-dialog>
        <!-- 编辑用户弹出框 -->
        <editEL ref="editEL" @edit-success="getuserslist"></editEL>
        <!-- 分页 -->
        <el-pagination
            background
            :page-size="5"
            layout="prev, pager, next"
            :total="userstotal"
            @current-change="usersfenye">
        </el-pagination>
    </div>
</template>

<script>
import axios from "@/utils/request"
import editEL from './handleEdit'
export default {
    data() {
        return{
            tableData:[],
            dialogFormVisible:false,
            userstotal:0,
            usersValue:"",
            addfrom:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            rules: {
                username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                mobile: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                ],

            }
        }
    },
    components:{
        editEL
    },
    created() {
        this.getuserslist()
    },
    methods:{
        handleDelete(item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then( async() => {
                const {data,meta} = await axios ({
                    method:'delete',
                    url:`/users/${item.id}`
                }).then(res => res.data)
                // console.log(data,meta)
                if(meta.status === 200) {
                    this.$message({
                    message: meta.msg,
                    type: 'success'
                    });
                    this.getuserslist()
                }
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            
        },
        usersfenye (page) {
            // console.log(page)
            this.getuserslist(page)
        },
        assignroles() {

        },
        // 改变状态
        async changeUserStatus (item) {
            const { data,meta } = await axios({
                method:'PUT',
                url:`users/${item.id}/state/${item.mg_state}`
            }).then(res => res.data)
            if(meta.status === 200) {
                this.$message({
                message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`,
                type: 'success'
                })
            }
            // console.log(item)
        },
        async sumitUserlist () {
            const { data,meta } = await axios({
                method:'POST',
                url:'/users',
                data:this.addfrom
            }).then(res => res.data)
            if(meta.status === 400 ) {
                this.$message({
                message: meta.msg,
                type: 'warning'
                });
            }else if(meta.status === 201 ) {
                this.$message({
                message: meta.msg,
                type: 'success'
                });
                this.dialogFormVisible = false;
                this.$refs.ruleForm.resetFields();
                this.getuserslist()
            }
            console.log("添加用户"+data,meta)
        },
       async getuserslist(page = 1) {
            
            const {data,meta} = await axios ({
                method:'GET',
                url:'/users',
                params:{
                    pagenum:page,
                    pagesize:5,
                    query:this.usersValue
                }
            }).then(res => res.data)
            console.log(data)
            if(meta.status === 200) {
                this.tableData = data.users,
                this.userstotal = data.total
            }

        }
    }
}
</script>

<style>

</style>
