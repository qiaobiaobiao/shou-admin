<template>
    <div>
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
        <el-form :model="addfrom" ref="ruleForm">
            <el-form-item label="用户名" label-width="80px" prop="username" disabled="true">
            <el-input v-model="addfrom.username"></el-input>
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
            <el-button type="primary" @click="submitUserlist">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from '@/utils/request'
export default {
    name:'editEL',
    data() {
        return{
            dialogFormVisible:false,
            addfrom:{
                username:'',
                email:"",
                mobile:"",
                id:"",
            }
        }
    },
    created() {

    },
    methods:{
        async showedit(item) {
            // console.log(item)
           const {data,meta} = await axios ({
                method:'GET',
                url:`/users/${item.id}`
            }).then(res =>res.data)
            this.dialogFormVisible = true,
            // console.log(data,meta)
            this.addfrom = data 

        },
        async submitUserlist() {
            const { data,meta } = await axios ({
                method:'PUT',
                url:`/users/${this.addfrom.id}`,
                data: this.addfrom
            }).then(res => res.data)
            // console.log(data,meta)
            if(meta.status === 200) {
                this.$message({
                message: meta.msg,
                type: 'success'
                });
                this.$emit('edit-success')
                this.dialogFormVisible = false
            }
        }
    }
}
</script>

<style>

</style>
