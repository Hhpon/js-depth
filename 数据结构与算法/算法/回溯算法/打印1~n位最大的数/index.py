
def printNumbers(n: int) -> [int]:
    def dfs(x):
        if x == n:  # 终止条件：已固定完所有位
            res.append(''.join(num))  # 拼接 num 并添加至 res 尾部
            return
        for i in range(10):  # 遍历 0 - 9
            num[x] = str(i)  # 固定第 x 位为 i
            dfs(x + 1)  # 开启固定第 x + 1 位

    num = ['0'] * n  # 起始数字定义为 n 个 0 组成的字符列表
    print(num)
    res = []  # 数字字符串列表
    dfs(0)  # 开启全排列递归
    return ','.join(res)  # 拼接所有数字字符串，使用逗号隔开，并返回


print(printNumbers(1))
